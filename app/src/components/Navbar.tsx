import * as React from 'react'
import { FiDownload, FiMenu } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { CommonContext } from '../contexts/CommonContext'
import Drawer from '../layouts/Drawer'
import Dropdown from './Dropdown'
import Switch from './Switch'
import Menu from './Menu'
import { DisplaySize, SM, XL } from '../globals'

interface NavbarProps {
    size?: DisplaySize
}

const Navbar: React.FC<NavbarProps> = ({ size = SM }) => {
    // react router
    const { booru } = useParams<{ booru: string }>()

    // contexts
    const { qdm, setQdm, downloads } = React.useContext(CommonContext)

    // states
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    // * qdm
    const toggleQdm = (e: React.ChangeEvent<HTMLInputElement>) => {
        // * qdm switch: checkbox
        if (e.target.checked) setQdm(true)
        else setQdm(false)
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const closeMenu = () => setIsMenuOpen(false)

    return (
        <div className="navbar">
            <nav>
                <section>
                    {/* logo */}
                    <div className="navbar__logo">
                        <Link to={booru ? `/${booru}/posts` : '/'}>booruverse</Link>
                    </div>

                    {/* booru select dropdown */}
                    <Dropdown defaultValue={booru || 'Select booru'} outlined coloredIcon>
                        <Link to="/yandere/posts">yandere</Link>
                        <Link to="/gelbooru/posts">gelbooru</Link>
                        <Link to="/danbooru/posts">danbooru</Link>
                    </Dropdown>
                </section>
                <section>
                    {/* download indicator */}
                    {downloads.downloading.length > 0 && (
                        <div className="navbar__downloading-indicator">
                            <FiDownload /> {downloads.downloading.length}
                        </div>
                    )}

                    {/* qdm switch */}
                    {size === XL && <Switch toggle={toggleQdm} on={qdm} name="QDM" />}

                    {/* menu toggle */}
                    <button className="btn menu-toggle" onClick={toggleMenu}>
                        <FiMenu />
                    </button>

                    {/* menu drawer */}
                    <Drawer isOpen={isMenuOpen} close={closeMenu}>
                        <Menu close={closeMenu} />
                    </Drawer>
                </section>
            </nav>
        </div>
    )
}

export default Navbar
