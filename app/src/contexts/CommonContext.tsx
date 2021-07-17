import * as React from 'react'
import { io } from 'socket.io-client'

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
}

const socket = io('/') // ? network ip needed? root location name? But, '/'  seems to work on development
export const CommonContext = React.createContext({} as ContextValue)

export const CommonContextProvider = ({ children }: { children: React.ReactNode }) => {
    // states
    const [scrollPos, setScrollPos] = React.useState(0)
    const [qdm, setQdm] = React.useState(false)
    const [socketStatus, setSocketStatus] = React.useState(false)
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

    return (
        <CommonContext.Provider
            value={{
                scrollPos,
                setScrollPos,
                qdm,
                setQdm,
                downloads,
                socketStatus
            }}>
            {children}
        </CommonContext.Provider>
    )
}
