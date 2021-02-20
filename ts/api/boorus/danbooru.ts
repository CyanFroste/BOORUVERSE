import axios from 'axios'
import Post from '../classes/post'
import Tag from '../classes/tag'

export default class Danbooru {
    name = "danbooru"
    postUrl = 'https://danbooru.donmai.us/posts.json'
    tagUrl = 'https://danbooru.donmai.us/tags.json'
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
            tags: data.tag_string,
            height: data.image_height,
            width: data.image_width,
            source: data.source,
            fileExt: data.file_ext,
            artist: data.tag_string_artist,
            previewUrl: data.preview_file_url,
            originalUrl: data.file_url,
            compressedUrl: data.large_file_url,
            originalSize: data.file_size
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
            count: data.post_count
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
                'search[order]': this.tagOrder,
                'search[name_matches]': '*' + query.toLowerCase() + '*'
            }
        })
        if (typeof data === 'string' && data.length === 0) return []
        return data.map((item: any) => this.formatTag(item))
    }
}
