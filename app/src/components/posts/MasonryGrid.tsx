import * as React from 'react'
import { DisplaySize, SM } from '../../globals'
import Card from './Card'

interface MasonryGridProps {
    items: any
    size?: DisplaySize
    setToast: React.Dispatch<any>
}

const MasonryGrid = ({ items, size = SM, setToast }: MasonryGridProps) => {
    const cols: JSX.Element[][] = [[], []]
    for (const [index, item] of items.entries()) {
        cols[index % 2].push(
            <Card item={item} key={index} index={index + 1} size={size} setToast={setToast} />
        )
    }
    return (
        <>
            <div className="grid-masonry__column">{cols[0]}</div>
            <div className="grid-masonry__column">{cols[1]}</div>
        </>
    )
}

export default MasonryGrid
