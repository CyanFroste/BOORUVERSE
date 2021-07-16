import * as React from 'react'
import { FiX } from 'react-icons/fi'

export interface SelectedTagsListProps {
    selectedTags: string[]
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
    limitId: string
}

const SelectedTagsList = ({ selectedTags, setSelectedTags, limitId }: SelectedTagsListProps) => (
    <section className="selected-tags__list">
        {selectedTags.map((tag) => (
            <div className="chip" key={tag}>
                <button
                    className="chip__action"
                    onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}>
                    <FiX />
                </button>
                <div className="chip__body">{tag.replaceAll('_', ' ')}</div>
            </div>
        ))}
        {limitId && (
            <div className="chip">
                <div className="chip__body">Id less than {limitId}</div>
            </div>
        )}
    </section>
)

export default SelectedTagsList
