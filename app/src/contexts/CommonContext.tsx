import * as React from 'react'
import { io } from 'socket.io-client'
import { TOAST_DURATION } from '../components/Toast'

interface ContextValue {
    scrollPos: number
    setScrollPos: React.Dispatch<React.SetStateAction<number>>
    qdm: boolean
    setQdm: React.Dispatch<React.SetStateAction<boolean>>
    downloads: {
        downloading: string[]
        downloaded: string[]
    }
    socketStatus: boolean
    toast: any
    setToast: React.Dispatch<any>
}

const socket = io('/') // ? network ip needed? root location name? But, '/'  seems to work on development
export const CommonContext = React.createContext({} as ContextValue)

export const CommonContextProvider: React.FC = ({ children }) => {
    // states
    const [scrollPos, setScrollPos] = React.useState(0)
    const [qdm, setQdm] = React.useState(false)
    const [socketStatus, setSocketStatus] = React.useState(false)
    const [toast, setToast] = React.useState<any>(null)
    const [downloads, setDownloads] = React.useState({
        downloading: [],
        downloaded: []
    })

    // * Socket
    React.useEffect(() => {
        socket.on('download', (data: any) => setDownloads(data))
        socket.on('connect', () => setSocketStatus(true))
        socket.on('disconnect', () => setSocketStatus(false))
    }, [])

    // * Toast
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (toast) setToast(null)
        }, TOAST_DURATION)
        return () => clearTimeout(timer)
    }, [toast])

    return (
        <CommonContext.Provider
            value={{
                scrollPos,
                setScrollPos,
                qdm,
                setQdm,
                downloads,
                socketStatus,
                toast,
                setToast
            }}>
            {children}
        </CommonContext.Provider>
    )
}
