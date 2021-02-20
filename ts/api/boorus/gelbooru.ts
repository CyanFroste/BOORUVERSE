import axios from 'axios'
import Post from '../classes/post'
import Tag from '../classes/tag'

export default class Gelbooru {
    name = 'gelbooru'
    postUrl = 'https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1'
    tagUrl = 'https://gelbooru.com/index.php?page=dapi&s=tag&q=index&json=1'
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
            fileExt: data.image.slice(data.image.indexOf('.') + 1),
            previewUrl: `https://gelbooru.com/thumbnails/${data.directory}/thumbnail_${data.hash}.jpg`,
            originalUrl: data.file_url,
            hash: data.hash,
            imageName: data.image,
            directory: data.directory
        })
    }

    async posts(limit: number, page: number, filters: string): Promise<Post[]> {
        const { data } = await axios({
            method: 'GET',
            responseType: 'json',
            url: this.postUrl,
            params: {
                limit,
                pid: page - 1,
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
            name: data.tag,
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
                pid: page - 1,
                orderby: this.tagOrder,
                name_pattern: '%' + query.toLowerCase() + '%'
            }
        })
        if (typeof data === 'string' && data.length === 0) return []
        return data.map((item: any) => this.formatTag(item))
    }
}
