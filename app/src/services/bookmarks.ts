export const addBookmark = async (
    booru: string,
    type: 'post' | 'tag',
    id?: number | undefined | null,
    name?: string | undefined | null
) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            booru,
            type,
            id,
            name
        })
    }

    const res = await fetch('/api/bookmark/create', options)
    return res.json()
}

export const removeBookmark = async (
    booru: string,
    type: 'post' | 'tag',
    id?: number | undefined | null,
    name?: string | undefined | null
) => {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            booru,
            type,
            id,
            name
        })
    }

    const res = await fetch('/api/bookmark/remove', options)
    return res.json()
}
