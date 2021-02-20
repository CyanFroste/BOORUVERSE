export type DisplaySize = 1 | 2
export const SM: DisplaySize = 1
export const XL: DisplaySize = 2

export type PageDirection = -1 | 1
export const NEXT_PAGE: PageDirection = 1
export const PREV_PAGE: PageDirection = -1

export type DownloadStatus = 1 | 2
export const DOWNLOADED: DownloadStatus = 1
export const DOWNLOADING: DownloadStatus = 2

export type FileType = 1 | 2
export const COMPRESSED: FileType = 1
export const ORIGINAL: FileType = 2

export type SelectionType = -1 | 0 | 1
export const INCLUDED: SelectionType = 1
export const EXCLUDED: SelectionType = -1
export const NOT_SELECTED: SelectionType = 0

export type BookmarkType = 1 | 2
export const POST_BOOKMARKS: BookmarkType = 1
export const TAG_BOOKMARKS: BookmarkType = 2

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
