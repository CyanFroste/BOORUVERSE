import * as React from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface DropdownProps {
    options?: any[]
    defaultValue?: string
    coloredIcon?: boolean
    outlined?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
    children,
    defaultValue = 'Select',
    coloredIcon,
    outlined
}) => {
    // states
    const [isDropped, setIsDropped] = React.useState(false)

    return (
        <div
            className={`dropdown ${isDropped ? 'open' : 'closed'}`}
            onClick={() => setIsDropped(!isDropped)}>
            {/* dropdown interface */}
            <button
                type="button"
                className={`btn text icon-right ${outlined ? 'outlined' : ''} ${
                    coloredIcon ? 'icon-colored' : ''
                }`}>
                {defaultValue} {isDropped ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {/* dropdown list */}
            <div className="dropdown__list">
                {React.Children.map(children, (child) => (
                    // * Wrapping component children inside list element for semantics
                    <div className="dropdown__list-item">{child}</div>
                ))}
            </div>
        </div>
    )
}

export default Dropdown
