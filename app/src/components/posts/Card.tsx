import * as React from 'react'
import { FiMaximize } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { CommonContext } from '../../contexts/CommonContext'
import { DisplaySize, ORIGINAL, SM, XL } from '../../globals'
import { SetPreviewData } from '../../screens/Posts'
import { download } from '../../services/files'

interface CardProps {
    item: any
    index?: number
    setPreviewData?: SetPreviewData
    size?: DisplaySize
}

const Card: React.FC<CardProps> = ({ item, index, setPreviewData, size = SM }) => {
    // contexts
    const { qdm, setToast } = React.useContext(CommonContext)

    // states
    const [minThumbnailHeight, setMinThumbnailHeight] = React.useState(
        (item.height / item.width) * 200 - 40
    )

    const previewButtonClick = () =>
        // * Sets preview data to display on the sidebar or modal
        setPreviewData &&
        setPreviewData({
            url: item.compressedUrl || item.originalUrl,
            ext: item.fileExt,
            id: item.id,
            booru: item.booru
        })

    const postLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // * If qdm enabled, download file instead of navigating to the location
        if (qdm) {
            e.preventDefault()
            download(item, ORIGINAL)
                .then((data) => {
                    setToast(data)
                })
                .catch((err) => setToast(err))
        }
    }

    // Component
    const Thumbnail = () => (
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
    // Component
    const DefaultCard = () => (
        <div className="default-card">
            {/* card's thumbnail */}
            <Thumbnail />

            <div className="default-card__badge">
                <div className="default-card__index">{index}</div>
                <div className="default-card__ext">{item.fileExt}</div>
            </div>
            <div className="default-card__content">
                <div className="default-card__id">{item.id}</div>
                <div className="default-card__controls">
                    <button type="button" className="btn" onClick={previewButtonClick}>
                        <FiMaximize />
                    </button>
                </div>
            </div>
        </div>
    )
    // Component
    const TileCard = () => (
        <div className="tile-card">
            {/* card's thumbnail */}
            <Thumbnail />

            <div className="tile-card__content">
                <div className="tile-card__details">
                    <div className="tile-card__index">{index}</div>
                    <div className="tile-card__ext">{item.fileExt}</div>
                </div>
                <div className="tile-card__id">{item.id}</div>
            </div>
        </div>
    )

    return (
        <>
            {item.id ? (
                <>
                    {size === SM && <TileCard />}
                    {size === XL && <DefaultCard />}
                </>
            ) : (
                <div className="card placeholder">Bad Id</div>
            )}
        </>
    )
}

export default Card
