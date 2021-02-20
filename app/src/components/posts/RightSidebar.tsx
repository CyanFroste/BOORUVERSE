import * as React from 'react'
import { FiMaximize } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { getPreview } from '../../services/media'
import Paginator from './Paginator'

export interface PreviewData {
    url?: string
    ext?: string
    id?: number | string
    booru?: string
}

interface RightSidebarProps extends PreviewData {
    page: string | null
    filters: string | null
}

// TODO: Refactor CSS

const RightSidebar: React.FC<RightSidebarProps> = ({ url, ext, id, booru, page, filters }) => {
    // * React Query: get base64 from provided url and extension to bypass CORS
    // ? Refactor if to support more extensions?
    const { data, status } = useQuery(['preview_quick', url, ext], () => getPreview(url, ext))

    return (
        <section className="posts__sidebar-right">
            {/* quick preview */}
            {status === 'loading' && (
                <div className="sidebar-right__preview placeholder">
                    {booru} {id}
                </div>
            )}
            {status === 'success' &&
                // * If no url or ext is provided data will be false
                (data ? (
                    <div className="sidebar-right__preview">
                        <TransformWrapper>
                            <TransformComponent>
                                <img src={data.src} alt="Original" />
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                ) : (
                    <div className="sidebar-right__preview placeholder">
                        {!(url && ext) ? (
                            <>
                                Click on <FiMaximize /> to Preview
                            </>
                        ) : (
                            // * If url and ext is provided but unsupported data / error is present
                            `${ext} preview not supported`
                        )}
                    </div>
                ))}

            <div className="sidebar-right__content">
                {/* paginator */}
                <Paginator {...{ page, filters }} />

                {/* current preview details */}
                <section>
                    <div className="current-preview-details">
                        <Link to={`/${booru}/post/${id}`}>
                            <span>{booru}</span>
                            <span>{id}</span>
                            <span>{ext}</span>
                        </Link>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default RightSidebar
