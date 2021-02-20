import * as React from 'react'
import {
    FiChevronLeft,
    FiChevronRight,
    FiSearch,
    FiX,
    FiFilter,
    FiArrowRight,
    FiRotateCw
} from 'react-icons/fi'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
import Modal from '../../layouts/Modal'
import { getTags } from '../../services/data'
import Error from '../Error'
import Loading from '../Loading'
import Tag from '../Tag'
import { useDebounce } from 'use-debounce'
import { DisplaySize, EXCLUDED, SelectionType, SM, XL } from '../../globals'

interface FiltersProps {
    booru: string
    filters: string | null
    size?: DisplaySize
}

const Filters: React.FC<FiltersProps> = ({ booru, filters, size = SM }) => {
    // react router
    const history = useHistory()

    // states
    // ? use useReducer ?
    const [page, setPage] = React.useState(1)
    const [selectedTags, setSelectedTags] = React.useState<string[]>([])
    const [isSelectedTagsListModalOpen, setIsSelectedTagsListModalOpen] = React.useState(false)
    const [newFilters, setNewFilters] = React.useState<string>('')
    const [limitId, setLimitId] = React.useState('')
    const [searchString, setSearchString] = React.useState('')

    // debounce
    // * Debounce and store the searchString state value
    const [debouncedSearchString] = useDebounce(searchString, 500)

    // refs
    const searchInput = React.useRef<HTMLInputElement>(null)
    const limitIdInput = React.useRef<HTMLInputElement>(null)

    // react query: get list of tags
    // * used debounced search string to limit this function call and the API requests
    const { data: tags, status } = useQuery(['tags', booru, page, debouncedSearchString], () =>
        getTags(booru, page, debouncedSearchString)
    )

    // * Parsing of filters and setting to state
    React.useEffect(() => {
        if (filters && filters.length) {
            let tags = filters.split(' ')
            if (tags[tags.length - 1].includes('id:<')) {
                // * If last tag is a limitId filter
                setLimitId(tags.pop()!.slice(4))
            }
            setSelectedTags(tags)
        } else {
            setLimitId('')
            setSelectedTags([])
        }
    }, [filters])

    // * Setting new filters from selected tags and limit id
    React.useEffect(() => {
        if (limitId.length) setNewFilters(`${selectedTags.join(' ')} id:<${limitId}`)
        else setNewFilters(`${selectedTags.join(' ')}`)
    }, [selectedTags, limitId])

    // * Including or Excluding Tag when it's selected
    const selectTag = (name: string, type: SelectionType) => {
        let maxTags = 4
        if (booru === 'danbooru') maxTags = 2
        if (
            !selectedTags.includes(name) &&
            !selectedTags.includes('-' + name) &&
            selectedTags.length < maxTags
        )
            setSelectedTags([...selectedTags, type === EXCLUDED ? '-' + name : name])
        else
            setSelectedTags(
                selectedTags.filter((t) => t !== (type === EXCLUDED ? '-' + name : name))
            )
    }

    // * Search input controls
    const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPage(1)
        setSearchString(e.target.value)
    }
    const clearSearch = () => {
        searchInput.current!.value = ''
        setSearchString('')
    }

    // * Limit Id input controls
    const limitIdOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setLimitId(e.target.value)
    const clearLimitId = () => {
        limitIdInput.current!.value = ''
        setLimitId('')
    }

    // * Main controls
    const filter = () => history.push(`/${booru}/posts?filters=${newFilters}`)
    const reset = () => {
        setSelectedTags([])
        setNewFilters('')
        setLimitId('')
        setSearchString('')
        searchInput.current!.value = ''
        limitIdInput.current!.value = ''
        setPage(1)
    }

    // * Selected tags list modal controls
    const toggleSelectedTagsListModal = () =>
        setIsSelectedTagsListModalOpen(!isSelectedTagsListModalOpen)
    const closeSelectedTagsListModal = () => setIsSelectedTagsListModalOpen(false)

    // Component
    const SelectedTagsList = () => (
        <section className="selected-tags__list">
            {selectedTags.map((tag) => (
                <div className="chip" key={tag}>
                    <button
                        className="chip__action"
                        onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}>
                        <FiX />
                    </button>
                    <div className="chip__body">{tag.replaceAll('_', ' ')}</div>
                </div>
            ))}
            {limitId && (
                <div className="chip">
                    <div className="chip__body">Id less than {limitId}</div>
                </div>
            )}
        </section>
    )
    // Component
    const SelectedTagsListModal = () => (
        <Modal isOpen={isSelectedTagsListModalOpen} close={closeSelectedTagsListModal}>
            <div className="filters__selected-tags">
                {selectedTags.length || limitId ? (
                    <>
                        {/* selected tags list */}
                        <SelectedTagsList />

                        <button
                            type="button"
                            className="btn icon-right icon-colored filters__selected-tags__go"
                            onClick={filter}>
                            FILTER <FiArrowRight />
                        </button>
                    </>
                ) : (
                    <section className="selected-tags__list placeholder">No filters</section>
                )}
            </div>
        </Modal>
    )

    return (
        <aside className="filters">
            {size === SM && <SelectedTagsList />}
            {size === XL && <SelectedTagsListModal />}

            {/* search input */}
            <div className="filters__search-container">
                <button type="button" className="btn">
                    <FiSearch />
                </button>
                <input
                    id="search"
                    ref={searchInput}
                    type="text"
                    className="textfield"
                    placeholder="Seach"
                    onChange={searchOnChange}
                />
                {searchString && (
                    <button type="button" className="btn" onClick={clearSearch}>
                        <FiX />
                    </button>
                )}
            </div>

            {/* limit id input */}
            <div className="filters__limit-id-container">
                <span className="btn">
                    <FiChevronLeft />
                </span>
                <input
                    type="text"
                    id="limit-id"
                    ref={limitIdInput}
                    onChange={limitIdOnChange}
                    placeholder="Id less than..."
                    className="textfield"
                />
                {limitId && (
                    <button type="button" className="btn" onClick={clearLimitId}>
                        <FiX />
                    </button>
                )}
            </div>

            {/* controls bar */}
            <div className="filters__controls">
                <div className="filters__page-indicator">{page}</div>
                <button
                    className="btn"
                    type="button"
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}>
                    <FiChevronLeft />
                </button>
                <button className="btn" type="button" onClick={() => setPage((old) => old + 1)}>
                    <FiChevronRight />
                </button>
                <button className="btn" type="button" onClick={reset}>
                    <FiRotateCw />
                </button>
                <button
                    className="btn icon-colored"
                    type="button"
                    onClick={size === XL ? toggleSelectedTagsListModal : filter}>
                    {size === XL && (
                        <div className="filters__selected-tags-count">{selectedTags.length}</div>
                    )}
                    <FiFilter />
                </button>
            </div>

            {/* tags list */}
            <section className="filters__tags-list">
                {status === 'loading' && <Loading />}
                {status === 'error' && <Error />}
                {status === 'success' &&
                    tags &&
                    (tags as any[]).map((tag) => (
                        <Tag
                            key={tag.id}
                            item={tag}
                            selectedTags={selectedTags}
                            selectTag={selectTag}
                        />
                    ))}
            </section>
        </aside>
    )
}

export default Filters
