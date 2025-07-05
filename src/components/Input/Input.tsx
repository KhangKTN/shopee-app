import cx from 'classix'
import { InputHTMLAttributes, useState } from 'react'
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
    type,
    rules,
    autoComplete,
    ...rest
}: Props) => {
    const registerApply = register && name ? register(name, rules) : {}
    const [isCloseEye, setCloseEye] = useState<boolean>(type === 'password')

    return (
        <div className={cx(classNameDiv, 'relative')}>
            <input
                type={isCloseEye ? 'password' : 'text'}
                className={className}
                autoComplete={autoComplete || 'off'}
                {...registerApply}
                {...rest}
            />
            {type === 'password' && (
                <i
                    onClick={() => setCloseEye(!isCloseEye)}
                    className={cx(
                        'top-1/2 right-4 absolute -translate-y-1/2 cursor-pointer fa-solid',
                        isCloseEye ? 'fa-eye-slash' : 'fa-eye'
                    )}
                ></i>
            )}
            {errorMsg && <p className='error'>{errorMsg}</p>}
        </div>
    )
}

export default Input
