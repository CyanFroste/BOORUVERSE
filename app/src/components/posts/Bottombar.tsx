import * as React from 'react'
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiFilter, FiX } from 'react-icons/fi'
import { useHistory, useLocation } from 'react-router-dom'
import { CommonContext } from '../../contexts/CommonContext'
import { DisplaySize, NEXT_PAGE, PageDirection, PREV_PAGE, SM } from '../../globals'
import Modal from '../../layouts/Modal' // sm modal?
import Switch from '../Switch'
import Filters from './Filters'
import { PaginatorProps } from './Paginator'

interface BottombarProps extends PaginatorProps {
    booru: string
    size?: DisplaySize
}

const Bottombar: React.FC<BottombarProps> = ({ booru, page, filters, size = SM }) => {
    // react router
    const history = useHistory()
    const location = useLocation()

    // contexts
    const { qdm, setQdm } = React.useContext(CommonContext)

    // states
    const [showPageInput, setShowPageInput] = React.useState(false)
    const [isFiltersModalOpen, setIsFiltersModalOpen] = React.useState(false)
    const [pageInput, setPageInput] = React.useState('')

    // filters modal
    const toggleFiltersModal = () => setIsFiltersModalOpen(!isFiltersModalOpen)
    const closeFiltersModal = () => setIsFiltersModalOpen(false)

    // * qdm
    const toggleQdm = (e: React.ChangeEvent<HTMLInputElement>) => {
        // * qdm switch: checkbox
        if (e.target.checked) setQdm(true)
        else setQdm(false)
    }

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
        <div className="bottombar">
            <nav>
                {/* prev button */}
                <button
                    type="button"
                    className="bottombar__prev btn"
                    onClick={() => changePage(PREV_PAGE)}>
                    <FiChevronLeft />
                </button>

                {/* page indicator and input controls */}
                {!showPageInput ? (
                    <button
                        type="button"
                        className="bottombar__page-indicator btn text"
                        onClick={() => setShowPageInput(!showPageInput)}>
                        {page || 1}
                    </button>
                ) : (
                    <div className="bottombar__page-input">
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

                {/* filters modal toggle */}
                <button type="button" className="btn" onClick={toggleFiltersModal}>
                    <FiFilter />
                </button>

                {/* filters modal */}
                <Modal isOpen={isFiltersModalOpen} close={closeFiltersModal}>
                    <Filters {...{ booru, filters, size }} />
                </Modal>

                {/* qdm switch */}
                <Switch toggle={toggleQdm} on={qdm} name="QDM" />

                {/* next button */}
                <button
                    type="button"
                    className="bottombar__next btn"
                    onClick={() => changePage(NEXT_PAGE)}>
                    <FiChevronRight />
                </button>
            </nav>
        </div>
    )
}

export default Bottombar
