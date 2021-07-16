import * as React from 'react'
import { FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface BookmarkedTagsProps {
    bookmarks: any
    selectBookmark: (bookmark: any) => void
}

const BookmarkedTags = ({ bookmarks, selectBookmark }: BookmarkedTagsProps) => (
    <div className="bookmarks__list">
        {bookmarks
            .filter((bookmark: any) => bookmark.name)
            .map((bookmark: any) => (
                <div key={bookmark._id} className="bookmarks__tag">
                    <Link to={`/${bookmark.booru}/posts?filters=${bookmark.name}`}>
                        <span>{bookmark.booru}</span>
                        {bookmark.name.replaceAll('_', ' ')}
                    </Link>
                    <button type="button" className="btn" onClick={() => selectBookmark(bookmark)}>
                        <FiX />
                    </button>
                </div>
            ))}
    </div>
)

export default BookmarkedTags
