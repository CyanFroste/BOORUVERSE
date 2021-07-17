import * as React from 'react'
import { FiMaximize, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Paginator from './Paginator'
import Preview, { PreviewProps } from './Preview'

interface RightSidebarProps {
    previewData: PreviewProps | null
    page: string | null
    filters: string | null
    setPreviewData: React.Dispatch<React.SetStateAction<PreviewProps | null>>
}

const RightSidebar = ({ previewData, setPreviewData, page, filters }: RightSidebarProps) => {
    return (
        <section className="posts__sidebar-right">
            {/* quick preview */}

            {previewData ? (
                <Preview {...previewData} />
            ) : (
                <div className="sidebar-right__preview placeholder">
                    Click on <FiMaximize /> to Preview
                </div>
            )}

            <div className="sidebar-right__content">
                {/* paginator */}
                <Paginator page={page} filters={filters} />

                {/* current preview details */}
                {previewData && (
                    <section>
                        <div className="current-preview-details">
                            <Link to={`/${previewData.booru}/post/${previewData.id}`}>
                                <span>{previewData.booru}</span>
                                <span>{previewData.id}</span>
                                <span>{previewData.ext}</span>
                            </Link>
                            <button
                                className="btn icon"
                                type="button"
                                onClick={() => setPreviewData(null)}>
                                <FiX />
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </section>
    )
}

export default RightSidebar
