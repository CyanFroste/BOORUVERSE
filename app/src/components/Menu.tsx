import * as React from 'react'
import { FiCheck, FiDownload, FiHeart, FiImage, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { CommonContext } from '../contexts/CommonContext'
import { DOWNLOADED, DOWNLOADING, DownloadStatus } from '../globals'

interface MenuProps {
    close: () => void
}

const Menu: React.FC<MenuProps> = ({ close }) => {
    // contexts
    const { downloads } = React.useContext(CommonContext)

    // * Generating link to downloading / downloaded file
    const link = (item: string, status: DownloadStatus, index: number) => {
        let [booru, id] = item.split(' ')
        if (booru === 'yande.re') booru = 'yandere'
        id = id.slice(0, id.indexOf('.')) // remove extension from id on file name
        return (
            <Link
                className={`downloads__item ${
                    status === DOWNLOADING ? 'downloading' : 'downloaded'
                }`}
                key={index} // * Since download may contain multiple items with same Ids
                to={`/${booru}/post/${id}`}>
                <FiImage /> {item}
            </Link>
        )
    }

    return (
        <aside className="menu">
            {/* top section containing close button (and title) */}
            <section className="menu__top">
                <button className="btn menu-toggle" onClick={close}>
                    <FiX />
                </button>
            </section>

            {/* controls */}
            <div className="menu__controls">
                <Link to="/bookmarks" className="btn outlined text icon-left icon-colored">
                    <FiHeart /> BOOKMARKS
                </Link>
            </div>

            {/* downloads */}
            <div className="menu__title">
                Downloads
                <div className="menu__download-counter">
                    <FiCheck /> {downloads.downloaded.length}
                </div>
                <div className="menu__download-counter">
                    <FiDownload /> {downloads.downloading.length}
                </div>
            </div>
            <div className="menu__downloads">
                {downloads.downloading.map((dl, i) => link(dl, DOWNLOADING, i))}
                {downloads.downloaded.map((dl, i) => link(dl, DOWNLOADED, i))}
            </div>
        </aside>
    )
}

export default Menu
