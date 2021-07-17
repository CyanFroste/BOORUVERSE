import * as React from 'react'
import { FiTrash } from 'react-icons/fi'
import { useQuery, useQueryClient } from 'react-query'
import BookmarkedPosts from '../components/bookmarks/BookmarkedPosts'
import BookmarkedTags from '../components/bookmarks/BookmarkedTags'
import Error from '../components/Error'
import Loading from '../components/Loading'
import { BookmarkType, POST_BOOKMARKS, SM, TAG_BOOKMARKS, XL } from '../globals'
import { useDisplaySize } from '../hooks/display'
import Modal from '../layouts/Modal'
import Screen from '../layouts/Screen'
import { removeBookmark } from '../services/bookmarks'
import { getBookmarks } from '../services/data'

const Bookmarks = () => {
    // * Query Client to modify cache
    const queryClient = useQueryClient()
    // react query: get list of bookmarks
    const { data: bookmarks, status } = useQuery('bookmarks', getBookmarks)

    // states
    const [tab, setTab] = React.useState<BookmarkType>(POST_BOOKMARKS)
    const [selectedBookmark, setSelectedBookmark] = React.useState<any | null>(null)
    const [toast, setToast] = React.useState<any>(null)

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

    return (
        <Screen title="booruverse | bookmarks" size={displaySize} toast={toast} setToast={setToast}>
            {status === 'loading' && <Loading full={true} />}
            {status === 'error' && <Error full={true} message="Something went wrong!" />}
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
                                {tab === POST_BOOKMARKS ? (
                                    <BookmarkedPosts
                                        bookmarks={bookmarks}
                                        selectBookmark={selectBookmark}
                                    />
                                ) : (
                                    <BookmarkedTags
                                        bookmarks={bookmarks}
                                        selectBookmark={selectBookmark}
                                    />
                                )}
                            </section>
                        </>
                    )}

                    {displaySize === XL && (
                        <>
                            <section>
                                <div className="bookmarks__title">POSTS</div>
                                <BookmarkedPosts
                                    bookmarks={bookmarks}
                                    selectBookmark={selectBookmark}
                                />
                            </section>
                            <section>
                                <div className="bookmarks__title">TAGS</div>
                                <BookmarkedTags
                                    bookmarks={bookmarks}
                                    selectBookmark={selectBookmark}
                                />
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
