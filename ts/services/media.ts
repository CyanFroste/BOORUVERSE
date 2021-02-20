import axios from 'axios'

// implement cache

export async function preview(
    url: string | undefined,
    type: string | undefined,
    ext: string | undefined
) {
    if (!url) throw new Error('Media link not provided')

    if (type === 'image') {
        if (!ext) ext = 'jpg'
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        return {
            src: `data:image/${ext};base64,${Buffer.from(response.data).toString('base64')}`
        }
    } else {
        // other media not supported currently
        throw new Error('Only images are currently supported')
    }
}
