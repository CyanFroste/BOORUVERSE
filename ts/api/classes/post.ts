export default class Post {
    id: number | string // number!
    booru: string
    tags: any[] // Tags[]
    height: number
    width: number
    fileExt: string
    source: string | undefined

    previewUrl: string
    originalUrl: string
    compressedUrl?: string | undefined
    originalSize?: number | string | undefined // number!
    compressedSize?: number | string | undefined // number!

    hash?: string | number | undefined // string!
    imageName?: string | undefined
    directory?: string | number | undefined // string!
    creatorId?: number | string | undefined // number!
    author?: string | undefined
    artist?: string | undefined

    constructor(params: Post) {
        this.id = params.id
        this.booru = params.booru
        this.tags = params.tags
        this.height = params.height
        this.width = params.width
        this.fileExt = params.fileExt
        this.source = params.source

        this.previewUrl = params.previewUrl
        this.originalUrl = params.originalUrl
        this.compressedUrl = params.compressedUrl
        this.originalSize = params.originalSize
        this.compressedSize = params.compressedSize

        this.hash = params.hash
        this.imageName = params.imageName
        this.directory = params.directory
        this.creatorId = params.creatorId
        this.author = params.author
        this.artist = params.artist
    }
}
