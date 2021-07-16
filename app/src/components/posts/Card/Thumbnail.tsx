import * as React from 'react'
import { Link } from 'react-router-dom'

export interface ThumbnailProps {
    item: any
    minThumbnailHeight: number
    setMinThumbnailHeight: React.Dispatch<React.SetStateAction<number>>
    postLinkClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const Thumbnail = ({
    item,
    minThumbnailHeight,
    setMinThumbnailHeight,
    postLinkClick
}: ThumbnailProps) => (
    <Link to={`/${item.booru}/post/${item.id}`} onClick={postLinkClick}>
        <img
            src={item.previewUrl}
            alt={item.source}
            // * Set calculated Thumbnail height as placeholder height of the image
            style={{ minHeight: minThumbnailHeight }}
            // * Set placeholder height to 0 after loading the thumbnail image
            onLoad={() => setMinThumbnailHeight(0)}
        />
    </Link>
)

export default Thumbnail
