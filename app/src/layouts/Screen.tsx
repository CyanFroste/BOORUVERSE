import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'
import { DisplaySize, SM } from '../globals'

interface ScreenProps {
    children: React.ReactNode
    title?: string
    navbar?: boolean
    size?: DisplaySize
    toast?: any
    setToast?: React.Dispatch<any>
}

const Screen = ({ title, navbar = true, children, size = SM, toast, setToast }: ScreenProps) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
            </Helmet>
            {navbar && <Navbar size={size} />}
            <div className="container">{children}</div>
            {toast && setToast && <Toast toast={toast} setToast={setToast} />}
        </>
    )
}

export default Screen
