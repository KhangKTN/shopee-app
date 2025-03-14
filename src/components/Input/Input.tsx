import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
    type: React.HTMLInputTypeAttribute,
    name: string,
    register?: UseFormRegister<any>,
    placeholder?: string,
    errorMsg?: string,
    className?: string,
    classNameInput?: string,
    rules?: RegisterOptions,
    autoComplete?: React.HTMLInputAutoCompleteAttribute
}

const Input = ({
    className = 'w-full mt-3',
    classNameInput = 'w-full border-gray-400 border-[1px] px-4 py-2 outline-none rounded focus:border-gray-500 focus:shadow',
    type,
    errorMsg,
    register,
    placeholder,
    name,
    rules,
    autoComplete
}: Props) => {
    const registerApply = register && name ? register(name, rules) : {}

    return (
        <div className={className}>
            <input
                className={classNameInput}
                type={type}
                placeholder={placeholder}
                {...registerApply}
                autoComplete={autoComplete || 'off'}
            />
            <div className='error'>{errorMsg}</div>
        </div>
    )
}

export default Input
