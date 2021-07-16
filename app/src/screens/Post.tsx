import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { download } from '../services/files'
import { getPost } from '../services/data'
import { CommonContext } from '../contexts/CommonContext'
import * as React from 'react'
import { FiHeart } from 'react-icons/fi'
import Screen from '../layouts/Screen'
import Preview from '../components/post/Preview'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Modal from '../layouts/Modal'
import { addBookmark } from '../services/bookmarks'
import { useDisplaySize } from '../hooks/display'
import { FileType, SM, XL } from '../globals'
import Tags from '../components/post/Tags'
import Content from '../components/post/Content'

const Post = () => {
    // react router
    const { booru, id } = useParams<{ booru: string; id: string }>()

    // contexts
    const { setToast } = React.useContext(CommonContext)

    // states
    const [selectedBookmark, setSelectedBookmark] = React.useState<any | null>(null)

    // react query: get a single post's data
    const { data: post, status } = useQuery(['post', booru, id], () => getPost(booru, id))

    // get display size
    const displaySize = useDisplaySize()

    // * Bookmark controls
    const selectBookmark = (bookmark: any) => setSelectedBookmark(bookmark)
    const deselectBookmark = () => setSelectedBookmark(null)
    const bookmark = () => {
        const { booru, type, booruId, name } = selectedBookmark
        addBookmark(booru, type, booruId, name)
            .then((data) => setToast(data))
            .catch((err) => setToast(err))
        setSelectedBookmark(null)
    }

    // * download file
    const downloadFile = (type: FileType) =>
        download(post, type)
            .then((data) => {
                setToast(data)
            })
            .catch((err) => setToast(err))

    return (
        <Screen title={`booruverse | ${booru} | ${id}`} size={displaySize}>
            {status === 'loading' && <Loading full={true} />}
            {status === 'error' && <Error full={true} />}
            {status === 'success' && post && (
                <main className="post">
                    {/* SM : preview -> content -> tags
                        XL : tags -> preview -> content */}

                    {displaySize === SM && (
                        <>
                            {/* preview  */}
                            <Preview
                                url={post.compressedUrl || post.originalUrl}
                                ext={post.fileExt}
                                fallbackUrl={post.previewUrl}
                            />

                            {/* content */}
                            <Content
                                post={post}
                                booru={booru}
                                downloadFile={downloadFile}
                                selectBookmark={selectBookmark}
                            />

                            {/* tags list */}
                            <Tags post={post} selectBookmark={selectBookmark} />
                        </>
                    )}
                    {displaySize === XL && (
                        <>
                            {/* tags list */}
                            <Tags post={post} selectBookmark={selectBookmark} />

                            {/* preview */}
                            <Preview
                                url={post.compressedUrl || post.originalUrl}
                                ext={post.fileExt}
                                fallbackUrl={post.previewUrl}
                            />

                            {/* content */}
                            <Content
                                post={post}
                                booru={booru}
                                downloadFile={downloadFile}
                                selectBookmark={selectBookmark}
                            />
                        </>
                    )}

                    {/* add bookmark modal dialog */}
                    <Modal isOpen={!!selectedBookmark} close={deselectBookmark}>
                        <div className="bookmark-confirmation">
                            <div>
                                Add
                                {selectedBookmark && (
                                    <span>
                                        {selectedBookmark.name?.replaceAll('_', ' ') ||
                                            selectedBookmark.booruId}
                                    </span>
                                )}
                                to bookmarks?
                            </div>
                            <button
                                className="btn outlined icon-left icon-colored"
                                type="button"
                                onClick={bookmark}>
                                <FiHeart /> Yes
                            </button>
                        </div>
                    </Modal>
                </main>
            )}
        </Screen>
    )
}

export default Post
