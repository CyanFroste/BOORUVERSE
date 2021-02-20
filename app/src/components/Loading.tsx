import * as React from 'react'

interface LoadingProps {
    full?: boolean
}

const Loading: React.FC<LoadingProps> = ({ full }) => {
    return (
        <div className={`loading ${full ? 'full' : 'fit'}`}>
            <div className="spinner">
                <span>BOORU</span>
                <span>VERSE</span>
            </div>
        </div>
    )
}

export default Loading
