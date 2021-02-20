import * as React from 'react'

const getWindowDimensions = () => ({
    width: window.innerWidth,
    height: window.innerHeight
})

export const useWindowDimensions = () => {
    const [
        windowDimensions
        // setWindowDimensions
    ] = React.useState(getWindowDimensions())

    // ! high cpu usage
    // const update = () => setWindowDimensions(getWindowDimensions())

    // React.useEffect(() => {
    //     window.addEventListener('resize', update)
    //     return () => window.removeEventListener('resize', update)
    // }, [])

    return windowDimensions
}
