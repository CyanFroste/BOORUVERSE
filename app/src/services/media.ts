export const getPreview = async (url: string | undefined, ext: string | undefined) => {
    // * if no url or ext is provided data will be false
    if (!(url && ext)) return false

    // check for valid/supported media types
    if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png' && ext !== 'gif') return false

    // ? set some kind of manual caching

    // options for 'image'
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: 'image',
            url,
            ext
        })
    }
    const res = await fetch('/api/media/preview', options)
    return res.json()
}
