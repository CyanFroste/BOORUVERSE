import * as React from 'react'

interface SwitchProps {
    toggle: (event: React.ChangeEvent<HTMLInputElement>) => void
    on: boolean
    name?: string
}

const Switch = ({ toggle, on, name }: SwitchProps) => {
    return (
        <div className={`switch ${on ? 'on' : 'off'}`}>
            {name && <div className="switch__name">{name}</div>}
            <label>
                <input type="checkbox" onChange={toggle} checked={on} />
                <div className="switch__container">
                    <div className="switch__slider"></div>
                </div>
            </label>
        </div>
    )
}
export default Switch
