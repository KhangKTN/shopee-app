import cx from 'classix'
import { memo } from 'react'
import './Checkbox.css'

interface Prop {
    id: string | undefined
    checked: boolean
    sizeClass?: string
    onChange: (checkAll: boolean, id?: string) => void
}

const Checkbox = ({ id, checked, onChange, sizeClass = 'size-4' }: Prop) => {
    return (
        <div className='checkbox-container'>
            <label className='ios-checkbox red'>
                <input onChange={() => (id ? onChange(false, id) : onChange(true))} type='checkbox' checked={checked} />
                <div className={cx('checkbox-wrapper', sizeClass)}>
                    <div className='checkbox-bg'></div>
                    <svg className='checkbox-icon' viewBox='0 0 24 24' fill='none'>
                        <path
                            className='check-path'
                            d='M4 12L10 18L20 6'
                            stroke='currentColor'
                            strokeWidth='3'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        ></path>
                    </svg>
                </div>
            </label>
        </div>
    )
}

export default memo(Checkbox)
