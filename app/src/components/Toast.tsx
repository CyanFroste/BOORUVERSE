import * as React from 'react'
import { createPortal } from 'react-dom'
import { FiAlertCircle, FiAlertOctagon, FiAlertTriangle, FiX } from 'react-icons/fi'
import { CommonContext } from '../contexts/CommonContext'
import { capitalize } from '../globals'

const Portal: React.FC = ({ children }) =>
    createPortal(children, document.getElementById('toast') as HTMLDivElement)

// * Toast's duration
export const TOAST_DURATION = 2000

const Toast = () => {
    // contexts
    const { toast, setToast } = React.useContext(CommonContext)

    // * Set toast's values from context' state

    return (
        <Portal>
            {toast && (
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
            )}
        </Portal>
    )
}

export default Toast
