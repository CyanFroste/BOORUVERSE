import * as React from 'react'
import { SM, XL } from '../globals'

const DESKTOP = 900

const getWindowDimensions = () => ({
    width: window.innerWidth,
    height: window.innerHeight
})

export const useDisplaySize = () => {
    const [{ width }] = React.useState(getWindowDimensions())
    return width > DESKTOP ? XL : SM
}
