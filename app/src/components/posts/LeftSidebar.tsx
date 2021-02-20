import * as React from 'react'
import { DisplaySize, XL } from '../../globals'
import Filters from './Filters'

interface LeftSidebarProps {
    booru: string
    filters: string | null
    size?: DisplaySize
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ booru, filters, size = XL }) => {
    return (
        <section className="posts__sidebar-left">
            <Filters {...{ booru, filters, size }} />
        </section>
    )
}

export default LeftSidebar
