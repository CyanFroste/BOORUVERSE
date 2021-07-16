import * as React from 'react'
import { createPortal } from 'react-dom'

const Portal: React.FC = ({ children }) =>
    createPortal(children, document.getElementById('modal') as HTMLDivElement)

export interface ModalProps {
    isOpen: boolean
    close: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, close }) => {
    React.useEffect(() => {
        isOpen && (document.body.style.overflow = 'hidden')
        return () => {
            document.body.style.overflow = 'auto'
        }
    })

    return (
        <Portal>
            {isOpen && (
                <div className="modal__backdrop" onClick={close}>
                    <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            )}
        </Portal>
    )
}

export default Modal
