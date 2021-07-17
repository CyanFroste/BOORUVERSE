import * as React from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface ErrorProps {
    full?: boolean
    message?: string
}

const Error = ({ full, message }: ErrorProps) => {
    return (
        <div className={`error ${full ? 'full' : 'fit'}`}>
            <FiAlertCircle />

            {/* link to home when error is fullscreen */}
            {full && (
                <Link className="btn text" to="/">
                    BOORUVERSE
                </Link>
            )}

            {/* error message */}
            {message && <div className="message">{message}</div>}
        </div>
    )
}

export default Error
