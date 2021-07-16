import * as React from 'react'
import { FiTag } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export interface TagsProps {
    post: any
    selectBookmark: (bookmark: any) => void
}

const Tags = ({ post, selectBookmark }: TagsProps) => (
    // TODO: Add this to Tag.tsx
    <section className="post__tags">
        {post.tags &&
            (post.tags as string).split(' ').map((tag) => (
                <div className="post-tag" key={tag}>
                    <button
                        className="btn"
                        type="button"
                        onClick={() =>
                            selectBookmark({
                                type: 'tag',
                                booru: post.booru,
                                name: tag
                            })
                        }>
                        <FiTag />
                    </button>
                    <Link to={`/${post.booru}/posts?filters=${tag}`} className="post-tag__name">
                        {tag.replaceAll('_', ' ')}
                    </Link>
                </div>
            ))}
    </section>
)

export default Tags
