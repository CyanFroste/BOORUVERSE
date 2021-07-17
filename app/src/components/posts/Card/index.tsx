import * as React from 'react'
import { CommonContext } from '../../../contexts/CommonContext'
import { DisplaySize, ORIGINAL, SM, XL } from '../../../globals'
import { download } from '../../../services/files'
import { PreviewProps } from '../Preview'
import DefaultCard from './DefaultCard'
import TileCard from './TileCard'

interface CardProps {
    item: any
    index: number
    setPreviewData?: React.Dispatch<React.SetStateAction<PreviewProps | null>>
    size?: DisplaySize
    setToast: React.Dispatch<any>
}

const Card = ({ item, index, setPreviewData, size = SM, setToast }: CardProps) => {
    // contexts
    const { qdm } = React.useContext(CommonContext)

    // states
    const [minThumbnailHeight, setMinThumbnailHeight] = React.useState(
        (item.height / item.width) * 200 - 40
    )

    const preview = () => {
        // * Sets preview data to display on the sidebar or modal
        setPreviewData &&
            setPreviewData({
                url: item.compressedUrl || item.originalUrl,
                ext: item.fileExt,
                id: item.id,
                booru: item.booru
            })
    }

    const postLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // * If qdm enabled, download file instead of navigating to the location
        if (qdm) {
            e.preventDefault()
            download(item, ORIGINAL)
                .then((data) => setToast(data))
                .catch((err) => setToast(err))
        }
    }

    return (
        <>
            {item.id ? (
                <>
                    {size === SM && (
                        <TileCard
                            item={item}
                            minThumbnailHeight={minThumbnailHeight}
                            setMinThumbnailHeight={setMinThumbnailHeight}
                            postLinkClick={postLinkClick}
                            index={index}
                        />
                    )}
                    {size === XL && (
                        <DefaultCard
                            item={item}
                            minThumbnailHeight={minThumbnailHeight}
                            setMinThumbnailHeight={setMinThumbnailHeight}
                            postLinkClick={postLinkClick}
                            index={index}
                            preview={preview}
                        />
                    )}
                </>
            ) : (
                <div className="card placeholder">Bad Id</div>
            )}
        </>
    )
}

export default Card
