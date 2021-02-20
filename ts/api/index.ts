import { list } from './boorus/common'
import Danbooru from './boorus/danbooru'
import Gelbooru from './boorus/gelbooru'
import Yandere from './boorus/yandere'
import { download } from './files'

import * as bookmark from './bookmark'

const DOWNLOAD_LOG_PATH = 'F:\\ANIME\\Images\\dl.log'

const yandere = new Yandere({ downloadLocation: 'F:\\ANIME\\Images\\yandere' })
const gelbooru = new Gelbooru({ downloadLocation: 'F:\\ANIME\\Images\\gelbooru' })
const danbooru = new Danbooru({ downloadLocation: 'F:\\ANIME\\Images\\danbooru' })

export async function getPosts(
    booru: string | undefined,
    page: number | string | undefined,
    filters: string | undefined,
    limit: number | string | undefined
) {
    if (!booru) throw new Error('Booru not Specified')
    if (!list.includes(booru)) throw new Error(`Only ${list.join(' / ')} is supported`)
    !limit || isNaN(+limit) ? (limit = 100) : (limit = +limit)
    !page || isNaN(+page) ? (page = 1) : (page = +page)
    if (!filters) filters = '' // better way?

    if (booru === 'yandere') return await yandere.posts(limit, page, filters)
    if (booru === 'gelbooru') return await gelbooru.posts(limit, page, filters)
    if (booru === 'danbooru') return await danbooru.posts(limit, page, filters)
}

export async function getTags(
    booru: string | undefined,
    page: number | string | undefined,
    query: string | undefined
) {
    if (!booru) throw new Error('Booru not Specified')
    if (!list.includes(booru)) throw new Error(`Only ${list.join(' / ')} is supported`)
    !page || isNaN(+page) ? (page = 1) : (page = +page)
    if (!query) query = '' // better way?

    if (booru === 'yandere') return await yandere.tags(page, query)
    if (booru === 'gelbooru') return await gelbooru.tags(page, query)
    if (booru === 'danbooru') return await danbooru.tags(page, query)
}

export async function downloadFile(
    booru: string | undefined,
    url: string,
    size: number | string,
    fileName: string
) {
    if (!booru) throw new Error('Booru not Specified')
    if (!list.includes(booru)) throw new Error(`Only ${list.join(' / ')} is supported`)

    let downloadLocation = yandere.downloadLocation
    if (booru === 'danbooru') downloadLocation = danbooru.downloadLocation
    if (booru === 'gelbooru') {
        downloadLocation = gelbooru.downloadLocation
        url = 'https://' + url.slice(url.indexOf('gelbooru'))
    }

    return await download(booru, url, size, downloadLocation, fileName, DOWNLOAD_LOG_PATH)
}

export { bookmark }
