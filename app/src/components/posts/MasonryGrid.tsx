import * as React from 'react'
import { DisplaySize, SM } from '../../globals'
import Card from './Card'

interface MasonryGridProps {
    items: any
    size?: DisplaySize
}

const MasonryGrid = ({ items, size = SM }: MasonryGridProps) => {
    const cols: JSX.Element[][] = [[], []]
    for (const [index, item] of items.entries()) {
        cols[index % 2].push(<Card item={item} key={item.id} index={index + 1} size={size} />)
    }
    return (
        <>
            <div className="grid-masonry__column">{cols[0]}</div>
            <div className="grid-masonry__column">{cols[1]}</div>
        </>
    )
}

export default MasonryGrid
