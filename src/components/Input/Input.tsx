import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
    type: React.HTMLInputTypeAttribute,
    name: string,
    register: UseFormRegister<any>,
    placeholder?: string,
    errorMsg?: string,
    className?: string,
    rules?: RegisterOptions,
    autoComplete?: React.HTMLInputAutoCompleteAttribute
}

const Input = ({type, errorMsg, register, placeholder, name, rules, autoComplete}: Props) => {
    return (
        <div className='w-full mb-1'>
            <input
                className='w-full border-gray-400 border-[1px] px-4 py-2 outline-none rounded focus:border-gray-500 focus:shadow'
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
                autoComplete={autoComplete || 'off'}
            />
            <p className='error'>{errorMsg}</p>
        </div>
    )
}

export default Input
