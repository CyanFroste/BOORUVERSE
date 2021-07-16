import * as React from 'react'
import Thumbnail, { ThumbnailProps } from './Thumbnail'

interface TileCardProps extends ThumbnailProps {
    index: number
}

const TileCard = ({
    item,
    minThumbnailHeight,
    setMinThumbnailHeight,
    postLinkClick,
    index
}: TileCardProps) => (
    <div className="tile-card">
        {/* card's thumbnail */}
        <Thumbnail {...{ item, minThumbnailHeight, setMinThumbnailHeight, postLinkClick }} />

        <div className="tile-card__content">
            <div className="tile-card__details">
                <div className="tile-card__index">{index}</div>
                <div className="tile-card__ext">{item.fileExt}</div>
            </div>
            <div className="tile-card__id">{item.id}</div>
        </div>
    </div>
)

export default TileCard
