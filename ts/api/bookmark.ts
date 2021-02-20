import { Bookmark, BookmarkModel } from './db'

export async function index() {
    return await BookmarkModel.find().sort({
        updatedAt: -1
    })
}

// create Bookmark
export async function create({ booru, type, booruId, name }: Bookmark) {
    // validation
    if (!booru) throw new Error('Booru not Specified')
    if (!type) throw new Error('Type of bookmark is not specified')
    if (type === 'tag') {
        if (!name) throw new Error('No name provided for the tag')
        if (await BookmarkModel.findOne({ booru, name }))
            return { message: 'Tag is already bookmarked', type: 'warning' }
        try {
            await BookmarkModel.create({
                booru,
                type,
                name
            })
            return { message: `${booru} / ${name} added to bookmarks`, type: 'alert' }
        } catch (err) {
            throw new Error('Bookmark not added')
        }
    }
    if (type === 'post') {
        if (!booruId) throw new Error('No id provided for the post')
        if (await BookmarkModel.findOne({ booru, booruId }))
            return { message: 'Post is already bookmarked', type: 'warning' }
        try {
            await BookmarkModel.create({
                booru,
                type,
                booruId
            })
            return { message: `${booru} ${booruId} added to bookmarks`, type: 'alert' }
        } catch (err) {
            throw new Error('Bookmark not added')
        }
    }
}

// remove bookmark
export async function remove({ booru, type, booruId, name }: Bookmark) {
    // validation
    if (!booru) throw new Error('Booru not Specified')
    if (!type) throw new Error('Type of bookmark is not specified')
    if (type === 'tag') {
        if (!name) throw new Error('No name provided for the tag')
        if (await BookmarkModel.findOneAndDelete({ booru, name }))
            return { message: `${booru} / ${name} removed from bookmarks`, type: 'alert' }
        return { message: "Tag doesn't exist", type: 'warning' }
    }
    if (type === 'post') {
        if (!booruId) throw new Error('No id provided for the post')
        if (await BookmarkModel.findOneAndDelete({ booru, booruId }))
            return { message: `${booru} ${booruId} removed from bookmarks`, type: 'alert' }
        return { message: "Post doesn't exist", type: 'warning' }
    }
}
