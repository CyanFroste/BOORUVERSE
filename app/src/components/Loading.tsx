import * as React from 'react'

interface LoadingProps {
    full?: boolean
    message?: string
}

const Loading = ({ full, message }: LoadingProps) => {
    return (
        <div className={`loading ${full ? 'full' : 'fit'}`}>
            <div className="spinner">
                <span>BOORU</span>
                <span>VERSE</span>
            </div>

            {/* loading message */}
            {message && <div className="message">{message}</div>}
        </div>
    )
}

export default Loading
