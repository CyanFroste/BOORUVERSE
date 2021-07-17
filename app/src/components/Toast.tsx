import * as React from 'react'
import { createPortal } from 'react-dom'
import { FiAlertCircle, FiAlertOctagon, FiAlertTriangle, FiX } from 'react-icons/fi'
import { capitalize } from '../globals'

const Portal = ({ children }: { children: React.ReactNode }) =>
    createPortal(children, document.getElementById('toast') as HTMLDivElement)

// * Toast's duration
export const TOAST_DURATION = 2000

interface ToastProps {
    toast: any
    setToast: React.Dispatch<any>
}

const Toast = ({ toast, setToast }: ToastProps) => {
    // * Clear Toast
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (toast) setToast(null)
        }, TOAST_DURATION)
        return () => clearTimeout(timer)
    })

    return (
        <Portal>
            <aside className="toast">
                <div className="toast__header">
                    <div className="toast__type">
                        {toast.type === 'alert' && <FiAlertCircle />}
                        {toast.type === 'error' && <FiAlertOctagon />}
                        {toast.type === 'warning' && <FiAlertTriangle />}
                        <span>{toast.type}</span>
                    </div>

                    {/* close toast */}
                    <button type="button" onClick={() => setToast(null)}>
                        <FiX />
                    </button>
                </div>
                <div className="toast__body">
                    <p className="toast__message">{capitalize(toast.message)}</p>
                </div>
            </aside>
        </Portal>
    )
}

export default Toast
