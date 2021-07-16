import * as React from 'react'
import { FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface BookmarkedPostsProps {
    bookmarks: any
    selectBookmark: (bookmark: any) => void
}

const BookmarkedPosts = ({ bookmarks, selectBookmark }: BookmarkedPostsProps) => (
    <div className="bookmarks__list">
        {bookmarks
            .filter((bookmark: any) => bookmark.booruId)
            .map((bookmark: any) => (
                <div key={bookmark._id} className="bookmarks__post">
                    <Link to={`/${bookmark.booru}/post/${bookmark.booruId}`}>
                        <span>{bookmark.booru}</span>
                        {bookmark.booruId}
                    </Link>
                    <button type="button" className="btn" onClick={() => selectBookmark(bookmark)}>
                        <FiX />
                    </button>
                </div>
            ))}
    </div>
)

export default BookmarkedPosts
