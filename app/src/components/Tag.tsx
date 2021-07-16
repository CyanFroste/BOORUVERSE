import * as React from 'react'
import { FiCheckCircle, FiMinus, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { NOT_SELECTED, INCLUDED, EXCLUDED } from '../globals'

interface TagProps {
    item: any
    selectTag?: Function
    selectedTags?: string[]
}

// utility
const shortenCount = (count: number) => {
    const numLen = count.toString().length
    if (numLen > 3 && numLen < 7) {
        return (count / 1000).toFixed(2) + ' K'
    } else if (numLen > 6 && numLen < 10) {
        return (count / 1000000).toFixed(2) + ' M'
    } else return count
}

const Tag: React.FC<TagProps> = ({ item, selectTag, selectedTags }) => {
    const isTagSelected = () =>
        selectedTags && (selectedTags.includes(item.name) || selectedTags.includes('-' + item.name))

    const getSelectionType = () => {
        if (!selectedTags || !isTagSelected()) return NOT_SELECTED
        if (selectedTags.includes(item.name)) return INCLUDED
        return EXCLUDED
    }

    return (
        <div className="filters-tag">
            {selectTag && (
                <div className="filters-tag__selection-control">
                    {/* include tag button */}
                    <button
                        type="button"
                        className="btn"
                        onClick={() => selectTag(item.name, INCLUDED)}>
                        {getSelectionType() === INCLUDED ? <FiCheckCircle /> : <FiPlus />}
                    </button>

                    {/* exclude tag button */}
                    <button
                        type="button"
                        className="btn icon-colored"
                        onClick={() => selectTag(item.name, EXCLUDED)}>
                        {getSelectionType() === EXCLUDED ? <FiCheckCircle /> : <FiMinus />}
                    </button>
                </div>
            )}

            {/* tag body */}
            <Link to={`/${item.booru}/posts?filters=${item.name}`} className="filters-tag__body">
                <div className="filters-tag__name">
                    {item.name.replaceAll('_', ' ')}
                    <span className="filters-tag__count">{shortenCount(item.count)}</span>
                </div>
            </Link>
        </div>
    )
}
export default Tag
