import * as React from 'react'
import { FiMaximize } from 'react-icons/fi'
import Thumbnail, { ThumbnailProps } from './Thumbnail'

interface DefaultCardProps extends ThumbnailProps {
    index: number
    preview: () => void
}

const DefaultCard = ({
    item,
    minThumbnailHeight,
    setMinThumbnailHeight,
    postLinkClick,
    index,
    preview
}: DefaultCardProps) => (
    <div className="default-card">
        {/* card's thumbnail */}
        <Thumbnail {...{ item, minThumbnailHeight, setMinThumbnailHeight, postLinkClick }} />

        <div className="default-card__badge">
            <div className="default-card__index">{index}</div>
            <div className="default-card__ext">{item.fileExt}</div>
        </div>
        <div className="default-card__content">
            <div className="default-card__id">{item.id}</div>
            <div className="default-card__controls">
                <button type="button" className="btn" onClick={preview}>
                    <FiMaximize />
                </button>
            </div>
        </div>
    </div>
)

export default DefaultCard
