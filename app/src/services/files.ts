import { COMPRESSED, FileType, ORIGINAL } from '../globals'

export const download = async (post: any, type: FileType = ORIGINAL) => {
    const { booru, id, fileExt, originalUrl, compressedUrl, originalSize, compressedSize } = post

    // if booru === yandere
    let fileName = `yande.re ${id}.${fileExt}`
    if (booru === 'danbooru') fileName = `danbooru ${id}.${fileExt}`
    if (booru === 'gelbooru') {
        let ext = post.imageName.slice(post.hash.length)
        fileName = `gelbooru ${id}${ext}`
    }

    let url = originalUrl
    let size = originalSize || 0
    if (type === COMPRESSED) {
        url = compressedUrl
        size = compressedSize
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            booru,
            url,
            fileName,
            size
        })
    }

    const res = await fetch('/api/file/download', options)
    return res.json()
}
