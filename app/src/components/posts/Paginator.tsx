import * as React from 'react'
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { useHistory, useLocation } from 'react-router-dom'
import { NEXT_PAGE, PageDirection, PREV_PAGE } from '../../globals'

export interface PaginatorProps {
    page: string | null
    filters: string | null
}

const Paginator = ({ page, filters }: PaginatorProps) => {
    // react router
    const history = useHistory()
    const location = useLocation()

    // states
    const [showPageInput, setShowPageInput] = React.useState(false)
    const [pageInput, setPageInput] = React.useState('')

    // pagination
    const gotoPage = (pg: number) => history.push(makePath(pg))
    const makePath = (num: string | number) => {
        // * To generate route URL with updated page number
        const currentRoute = location.pathname
        if (!filters) return `${currentRoute}?page=${num}`
        return `${currentRoute}?page=${num}&filters=${filters}`
    }
    const changePage = (type: PageDirection) => {
        const currentPage = +(page || 1)
        if (type === PREV_PAGE && currentPage !== 1) return gotoPage(currentPage - 1)
        if (type === NEXT_PAGE) return gotoPage(currentPage + 1)
    }
    const gotoInputPage = () => {
        gotoPage(+pageInput || 1)
        setShowPageInput(false)
    }

    return (
        <div className="paginator">
            <nav>
                {/* next button */}
                <button
                    type="button"
                    className="btn text outlined icon-right icon-colored"
                    onClick={() => changePage(NEXT_PAGE)}>
                    NEXT <FiChevronRight />
                </button>

                {/* page indicator and input controls */}
                {!showPageInput ? (
                    <button
                        type="button"
                        className="paginator__page-indicator btn text"
                        onClick={() => setShowPageInput(!showPageInput)}>
                        {page || 1}
                    </button>
                ) : (
                    <div className="paginator__page-input">
                        <button
                            className="btn"
                            type="button"
                            onClick={() => setShowPageInput(!showPageInput)}>
                            <FiX />
                        </button>
                        <input
                            className="textfield"
                            placeholder="goto"
                            type="text"
                            autoFocus
                            onChange={(e) => setPageInput(e.target.value)}
                        />
                        <button className="btn icon-colored" type="button" onClick={gotoInputPage}>
                            <FiArrowRight />
                        </button>
                    </div>
                )}

                {/* prev button */}
                <button
                    type="button"
                    className="btn text outlined icon-left icon-colored"
                    onClick={() => changePage(PREV_PAGE)}>
                    <FiChevronLeft /> PREV
                </button>
            </nav>
        </div>
    )
}

export default Paginator
