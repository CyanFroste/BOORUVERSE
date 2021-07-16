import * as React from 'react'

export interface DetailsProps {
    booru: string
    post: any
}

const Details = ({ booru, post }: DetailsProps) => (
    <>
        {booru === 'yandere' && (
            <div>
                <span>Author</span> {post.author} ({post.creatorId})
            </div>
        )}
        {booru === 'gelbooru' && (
            <>
                <div>
                    <span>Hash</span> {post.hash}
                </div>
                <div>
                    <span>Image</span> {post.image}
                </div>
            </>
        )}
        {booru === 'danbooru' && (
            <div>
                <span>Artist</span> {post.artist}
            </div>
        )}
        <div>
            <span>Extension</span> {post.fileExt}
        </div>
        <div>
            <span>Resolution</span> {post.width} x {post.height}
        </div>
    </>
)

export default Details
