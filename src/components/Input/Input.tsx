import cx from 'classix'
import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    register?: UseFormRegister<any>
    errorMsg?: string
    classNameDiv?: string
    rules?: RegisterOptions
}

const Input = ({
    classNameDiv = 'w-full',
    className = 'w-full border-gray-200 border-[1px] px-4 py-2 outline-none rounded focus:border-primary/50',
    errorMsg,
    register,
    name,
    rules,
    autoComplete,
    ...rest
}: Props) => {
    const registerApply = register && name ? register(name, rules) : {}

    return (
        <div className={cx(classNameDiv, 'relative')}>
            <input className={className} {...registerApply} autoComplete={autoComplete || 'off'} {...rest} />
            {errorMsg && <p className='error'>{errorMsg}</p>}
        </div>
    )
}

export default Input
