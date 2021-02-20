import axios from 'axios'
import Post from '../classes/post'
import Tag from '../classes/tag'

export default class Yandere {
    name = "yandere"
    postUrl = 'https://yande.re/post.json'
    tagUrl = 'https://yande.re/tag.json'
    tagLimit
    tagOrder
    downloadLocation

    constructor(options: {
        tagLimit?: 10 | 20 | 40 | 60 | 80 | 100
        tagOrder?: string
        downloadLocation: string
    }) {
        this.tagLimit = options.tagLimit || 20
        this.tagOrder = options.tagOrder || 'count'
        this.downloadLocation = options.downloadLocation
    }

    formatPost(data: any) {
        return new Post({
            id: data.id,
            booru: this.name,
            tags: data.tags,
            height: data.height,
            width: data.width,
            source: data.source,
            fileExt: data.file_ext,
            creatorId: data.creator_id,
            author: data.author,
            previewUrl: data.preview_url,
            originalUrl: data.file_url,
            compressedUrl: data.jpeg_url,
            originalSize: data.file_size,
            compressedSize: data.jpeg_file_size
        })
    }

    async posts(limit: number, page: number, filters: string): Promise<Post[]> {
        const { data } = await axios({
            method: 'GET',
            responseType: 'json',
            url: this.postUrl,
            params: {
                limit,
                page,
                tags: filters
            }
        })
        if (typeof data === 'string' && data.length === 0) return []
        return data.map((item: any) => this.formatPost(item))
    }

    formatTag(data: any) {
        return new Tag({
            id: data.id,
            booru: this.name,
            name: data.name,
            count: data.count
        })
    }

    async tags(page: number, query: string): Promise<Tag[]> {
        const { data } = await axios({
            method: 'GET',
            responseType: 'json',
            url: this.tagUrl,
            params: {
                limit: this.tagLimit,
                page,
                order: this.tagOrder,
                name: query.toLowerCase()
            }
        })
        if (typeof data === 'string' && data.length === 0) return []
        return data.map((item: any) => this.formatTag(item))
    }
}
