// posts
export const getPosts = async (
    booru: string,
    page: string | number | null,
    filters: string | null,
    limit?: string | number | null
) => {
    const res = await fetch(
        `/api/${booru}/posts?page=${!page || isNaN(+page) ? 1 : +page}&filters=${
            filters || ''
        }&limit=${!limit || isNaN(+limit) ? 100 : +limit}`
    )
    return res.json()
}

// single post
export const getPost = async (booru: string, id: number | string) => {
    const res = await fetch(`/api/${booru}/posts?page=1&filters=id:${id}&limit=1`)
    return (await res.json())[0]
}

// tags
export const getTags = async (booru: string, page: number, query: string) => {
    const res = await fetch(`/api/${booru}/tags?page=${page}&query=${query}`)
    return res.json()
}

// bookmarks
export const getBookmarks = async () => {
    const res = await fetch('/api/bookmarks')
    return res.json()
}
