import * as React from 'react'
import { FiHeart } from 'react-icons/fi'
import { COMPRESSED, FileType, ORIGINAL } from '../../globals'
import Button, { OPEN_IN_NEW_TAB, SOURCE } from './Button'
import Details from './Details'
import { TagsProps } from './Tags'

interface ContentProps extends TagsProps {
    downloadFile: (type: FileType) => Promise<void>
    booru: string
}

const Content = ({ post, booru, downloadFile, selectBookmark }: ContentProps) => (
    <section className="post__content">
        {/* id and controls */}
        <div className="post__id">
            <button
                type="button"
                className="btn outlined icon-colored"
                onClick={() =>
                    selectBookmark({
                        type: 'post',
                        booru: post.booru,
                        booruId: post.id
                    })
                }>
                <FiHeart />
            </button>
            {post.id}
        </div>

        {/* buttons */}
        <div className="post__buttons">
            <Button variant={COMPRESSED} post={post} booru={booru} downloadFile={downloadFile} />
            <Button variant={ORIGINAL} post={post} booru={booru} downloadFile={downloadFile} />
            <Button
                variant={OPEN_IN_NEW_TAB}
                post={post}
                booru={booru}
                downloadFile={downloadFile}
            />
            <Button variant={SOURCE} post={post} booru={booru} downloadFile={downloadFile} />
        </div>

        {/* details */}
        <div className="post__details">
            <Details booru={booru} post={post} />
        </div>
    </section>
)

export default Content
