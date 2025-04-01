import cx from 'classix'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    errorMsg?: string
    classNameDiv?: string
}

const InputNumber = ({
    classNameDiv = 'w-full mt-3',
    className = 'w-full border-gray-400 border-[1px] px-4 py-2 outline-none rounded focus:border-gray-500 focus:shadow',
    errorMsg,
    onChange,
    ...rest
}: Props) => {
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value
        if (onChange && (/^\d+$/.test(value) || value === '')) {
            onChange(event)
        }
    }

    return (
        <div className={classNameDiv}>
            <input
                className={cx(className, errorMsg && 'border-[1px] border-red-500')}
                onChange={handleChangeInput}
                {...rest}
            />
        </div>
    )
}

export default InputNumber
