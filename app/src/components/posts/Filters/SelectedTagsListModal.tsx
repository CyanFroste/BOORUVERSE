import * as React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import Modal, { ModalProps } from '../../../layouts/Modal'
import SelectedTagsList, { SelectedTagsListProps } from './SelectedTagsList'

interface SelectedTagsListModalProps extends ModalProps, SelectedTagsListProps {
    filter: () => void
}

const SelectedTagsListModal = ({
    isOpen,
    close,
    selectedTags,
    limitId,
    setSelectedTags,
    filter
}: SelectedTagsListModalProps) => (
    <Modal isOpen={isOpen} close={close}>
        <div className="filters__selected-tags">
            {selectedTags.length || limitId ? (
                <>
                    {/* selected tags list */}
                    <SelectedTagsList
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        limitId={limitId}
                    />

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

export default SelectedTagsListModal
