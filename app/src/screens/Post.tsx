import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { download } from '../services/files'
import { getPost } from '../services/data'
import { CommonContext } from '../contexts/CommonContext'
import * as React from 'react'
import { FiAlertCircle, FiDownload, FiExternalLink, FiHeart, FiLink, FiTag } from 'react-icons/fi'
import Screen from '../layouts/Screen'
import Preview from '../components/post/Preview'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Modal from '../layouts/Modal'
import { addBookmark } from '../services/bookmarks'
import { useDisplaySize } from '../hooks/display'
import { COMPRESSED, FileType, ORIGINAL, SM, XL } from '../globals'

type ButtonVariant = 1 | 2 | 3 | 4
const DOWNLOAD_ORIGINAL: ButtonVariant = 1
const DOWNLOAD_COMPRESSED: ButtonVariant = 2
const OPEN_IN_NEW_TAB: ButtonVariant = 3
const SOURCE: ButtonVariant = 4

interface ButtonProps {
    variant: ButtonVariant
}

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

    // Component
    const Button = ({ variant }: ButtonProps) => {
        const originalUrl = post.originalUrl
        const originalSize = post.originalSize
            ? Math.ceil((post.originalSize / 1024 / 1024 + Number.EPSILON) * 100) / 100
            : undefined
        const compressedSize = post.compressedSize
            ? Math.floor((post.compressedSize / 1024 / 1024 + Number.EPSILON) * 100) / 100
            : undefined

        return (
            <>
                {variant === DOWNLOAD_COMPRESSED && compressedSize && (
                    <button
                        className="btn icon-colored icon-left text outlined"
                        type="button"
                        onClick={() => downloadFile(COMPRESSED)}>
                        <FiDownload /> COMPRESSED - {compressedSize}Mb
                    </button>
                )}

                {variant === DOWNLOAD_ORIGINAL &&
                    (originalUrl ? (
                        <button
                            className="btn icon-colored icon-left text outlined"
                            type="button"
                            onClick={() => downloadFile(ORIGINAL)}>
                            <FiDownload /> ORIGINAL {originalSize && `- ${originalSize}Mb`}
                        </button>
                    ) : (
                        <button className="btn icon-colored icon-left text outlined" type="button">
                            <FiAlertCircle /> DOWNLOAD NOT AVAILABLE
                        </button>
                    ))}

                {variant === OPEN_IN_NEW_TAB && (
                    <button
                        className="btn icon-colored icon-left text outlined"
                        type="button"
                        onClick={() => {
                            let _url = post.originalUrl
                            if (booru === 'gelboooru')
                                _url = `${_url.slice(0, 8)}${_url.slice(_url.indexOf('gelbooru'))}`
                            window.open(_url, '_blank')
                        }}>
                        <FiExternalLink /> OPEN IN A NEW TAB
                    </button>
                )}

                {variant === SOURCE && post.source && (
                    <button
                        className="btn icon-colored icon-left text outlined"
                        type="button"
                        onClick={() => {
                            window.open(post.source, '_blank')
                        }}>
                        <FiLink /> SOURCE
                    </button>
                )}
            </>
        )
    }

    // Component
    const Details = () => (
        <>
            {booru === 'yandere' && (
                <div>
                    <span>Author</span> {post.author} ({post.creatorId})
                </div>
            )}
            {booru === 'gelbooru' && (
                <>
                    <div>
                        <span>Hash</span> {post.hash}
                    </div>
                    <div>
                        <span>Image</span> {post.image}
                    </div>
                </>
            )}
            {booru === 'danbooru' && (
                <div>
                    <span>Artist</span> {post.artist}
                </div>
            )}
            <div>
                <span>Extension</span> {post.fileExt}
            </div>
            <div>
                <span>Resolution</span> {post.width} x {post.height}
            </div>
        </>
    )

    // Component
    const Tags = () => (
        // TODO: Add this to Tag.tsx
        <section className="post__tags">
            {post.tags &&
                (post.tags as string).split(' ').map((tag) => (
                    <div className="post-tag" key={tag}>
                        <button
                            className="btn"
                            type="button"
                            onClick={() =>
                                selectBookmark({
                                    type: 'tag',
                                    booru: post.booru,
                                    name: tag
                                })
                            }>
                            <FiTag />
                        </button>
                        <Link to={`/${post.booru}/posts?filters=${tag}`} className="post-tag__name">
                            {tag.replaceAll('_', ' ')}
                        </Link>
                    </div>
                ))}
        </section>
    )

    // Component
    const Content = () => (
        <section className="post__content">
            {/* id and controls */}
            <div className="post__id">
                <button
                    type="button"
                    className="btn outlined icon-colored"
                    onClick={() =>
                        selectBookmark({
                            type: 'post',
                            booru: post.booru,
                            booruId: post.id
                        })
                    }>
                    <FiHeart />
                </button>
                {post.id}
            </div>

            {/* buttons */}
            <div className="post__buttons">
                <Button variant={COMPRESSED} />
                <Button variant={ORIGINAL} />
                <Button variant={OPEN_IN_NEW_TAB} />
                <Button variant={SOURCE} />
            </div>

            {/* details */}
            <div className="post__details">
                <Details />
            </div>
        </section>
    )

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
                            <Content />

                            {/* tags list */}
                            <Tags />
                        </>
                    )}
                    {displaySize === XL && (
                        <>
                            {/* tags list */}
                            <Tags />

                            {/* preview */}
                            <Preview
                                url={post.compressedUrl || post.originalUrl}
                                ext={post.fileExt}
                                fallbackUrl={post.previewUrl}
                            />

                            {/* content */}
                            <Content />
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
