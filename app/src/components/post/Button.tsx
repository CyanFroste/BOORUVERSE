import * as React from 'react'
import { FiAlertCircle, FiDownload, FiExternalLink, FiLink } from 'react-icons/fi'
import { COMPRESSED, FileType, ORIGINAL } from '../../globals'

export type ButtonVariant = 1 | 2 | 3 | 4
export const DOWNLOAD_ORIGINAL: ButtonVariant = 1
export const DOWNLOAD_COMPRESSED: ButtonVariant = 2
export const OPEN_IN_NEW_TAB: ButtonVariant = 3
export const SOURCE: ButtonVariant = 4

export interface ButtonProps {
    variant: ButtonVariant
    post: any
    downloadFile: (type: FileType) => Promise<void>
    booru: string
}

const Button = ({ variant, post, booru, downloadFile }: ButtonProps) => {
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

export default Button
