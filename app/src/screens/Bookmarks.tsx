import * as React from 'react'
import { FiTrash, FiX } from 'react-icons/fi'
import { useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import Error from '../components/Error'
import Loading from '../components/Loading'
import { CommonContext } from '../contexts/CommonContext'
import { BookmarkType, POST_BOOKMARKS, SM, TAG_BOOKMARKS, XL } from '../globals'
import { useDisplaySize } from '../hooks/display'
import Modal from '../layouts/Modal'
import Screen from '../layouts/Screen'
import { removeBookmark } from '../services/bookmarks'
import { getBookmarks } from '../services/data'

interface BookmarksProps {}

const Bookmarks: React.FC<BookmarksProps> = () => {
    // contexts
    const { setToast } = React.useContext(CommonContext)

    // * Query Client to modify cache
    const queryClient = useQueryClient()
    // react query: get list of bookmarks
    const { data: bookmarks, status } = useQuery('bookmarks', getBookmarks)

    // states
    const [tab, setTab] = React.useState<BookmarkType>(POST_BOOKMARKS)
    const [selectedBookmark, setSelectedBookmark] = React.useState<any | null>(null)

    // get display size
    const displaySize = useDisplaySize()

    // * Bookmark controls
    const selectBookmark = (bookmark: any) => setSelectedBookmark(bookmark)
    const deselectBookmark = () => setSelectedBookmark(null)
    const unbookmark = () => {
        const { booru, type, booruId, name } = selectedBookmark
        removeBookmark(booru, type, booruId, name)
            .then((data) => setToast(data))
            .catch((err) => setToast(err))
        setSelectedBookmark(null)
        queryClient.invalidateQueries('bookmarks')
    }

    // Component
    const BookmarkedPosts = () => (
        <div className="bookmarks__list">
            {bookmarks
                .filter((bookmark: any) => bookmark.booruId)
                .map((bookmark: any) => (
                    <div key={bookmark._id} className="bookmarks__post">
                        <Link to={`/${bookmark.booru}/post/${bookmark.booruId}`}>
                            <span>{bookmark.booru}</span>
                            {bookmark.booruId}
                        </Link>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => selectBookmark(bookmark)}>
                            <FiX />
                        </button>
                    </div>
                ))}
        </div>
    )
    // Component
    const BookmarkedTags = () => (
        <div className="bookmarks__list">
            {bookmarks
                .filter((bookmark: any) => bookmark.name)
                .map((bookmark: any) => (
                    <div key={bookmark._id} className="bookmarks__tag">
                        <Link to={`/${bookmark.booru}/posts?filters=${bookmark.name}`}>
                            <span>{bookmark.booru}</span>
                            {bookmark.name.replaceAll('_', ' ')}
                        </Link>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => selectBookmark(bookmark)}>
                            <FiX />
                        </button>
                    </div>
                ))}
        </div>
    )

    return (
        <Screen title="booruverse | bookmarks" size={displaySize}>
            {status === 'loading' && <Loading full={true} />}
            {status === 'error' && <Error full={true} />}
            {status === 'success' && bookmarks && (
                <main className="bookmarks">
                    {displaySize === SM && (
                        <>
                            {/* tabbed view for sm displays */}
                            <div className="bookmarks__tab-switch">
                                <button
                                    type="button"
                                    className={`btn text ${tab === POST_BOOKMARKS && 'selected'} `}
                                    onClick={() =>
                                        tab !== POST_BOOKMARKS && setTab(POST_BOOKMARKS)
                                    }>
                                    POSTS
                                </button>
                                <button
                                    type="button"
                                    className={`btn text ${tab === TAG_BOOKMARKS && 'selected'} `}
                                    onClick={() => tab !== TAG_BOOKMARKS && setTab(TAG_BOOKMARKS)}>
                                    TAGS
                                </button>
                            </div>

                            {/* bookmarks */}
                            <section>
                                {tab === POST_BOOKMARKS ? <BookmarkedPosts /> : <BookmarkedTags />}
                            </section>
                        </>
                    )}

                    {displaySize === XL && (
                        <>
                            <section>
                                <div className="bookmarks__title">POSTS</div>
                                <BookmarkedPosts />
                            </section>
                            <section>
                                <div className="bookmarks__title">TAGS</div>
                                <BookmarkedTags />
                            </section>
                        </>
                    )}

                    {/* remove bookmark modal dialog */}
                    <Modal isOpen={!!selectedBookmark} close={deselectBookmark}>
                        <div className="bookmark-confirmation">
                            <div>
                                Remove
                                {selectedBookmark && (
                                    <span>
                                        {selectedBookmark.name?.replaceAll('_', ' ') ||
                                            selectedBookmark.booruId}
                                    </span>
                                )}
                                from bookmarks?
                            </div>
                            <button
                                className="btn outlined icon-left icon-colored"
                                type="button"
                                onClick={unbookmark}>
                                <FiTrash /> Yes
                            </button>
                        </div>
                    </Modal>
                </main>
            )}
        </Screen>
    )
}

export default Bookmarks
