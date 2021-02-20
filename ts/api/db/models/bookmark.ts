import { Schema, model } from 'mongoose'

export interface Bookmark {
    booru: string
    type: 'post' | 'tag'
    booruId: number | null
    name: string | null
}

const BookmarkSchema = new Schema(
    {
        booru: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['post', 'tag'],
            default: 'post'
        },
        booruId: Number,
        name: String
    },
    { timestamps: true }
)

export default model('bookmark', BookmarkSchema)
