import * as React from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children }: { children: React.ReactNode }) =>
    createPortal(children, document.getElementById('drawer') as HTMLDivElement)

interface DrawerProps {
    children: React.ReactNode
    isOpen: boolean
    close: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Drawer = ({ children, isOpen, close }: DrawerProps) => {
    React.useEffect(() => {
        isOpen && (document.body.style.overflow = 'hidden')
        return () => {
            document.body.style.overflow = 'auto'
        }
    })

    return (
        <Portal>
            {isOpen && (
                <div className="drawer__backdrop" onClick={close}>
                    <div className="drawer__content" onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            )}
        </Portal>
    )
}

export default Drawer
