import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import { DisplaySize, SM } from '../globals'

interface ScreenProps {
    title?: string
    navbar?: boolean
    size?: DisplaySize
}

const Screen: React.FC<ScreenProps> = ({ title, navbar = true, children, size = SM }) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
            </Helmet>
            {navbar && <Navbar size={size} />}
            <div className="container">{children}</div>
        </>
    )
}

export default Screen
