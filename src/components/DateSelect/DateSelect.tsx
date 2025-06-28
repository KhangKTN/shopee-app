import _ from 'lodash'
import { useEffect, useState } from 'react'
import { UseFormClearErrors, UseFormSetError } from 'react-hook-form'

const selectClassName =
    'col-span-4 px-4 py-2 border hover:border border-gray-200 hover:border-primary/50 rounded outline-none'

interface Props {
    name: 'date_of_birth'
    value: Date
    onChange?: (value: Date) => void
    setError: UseFormSetError<{ date_of_birth?: Date | undefined }>
    clearError: UseFormClearErrors<{ date_of_birth?: Date | undefined }>
    errorMessage?: string
}

const DATE_NAME = {
    DATE: 'date',
    MONTH: 'month',
    YEAR: 'year'
} as const

type DateName = (typeof DATE_NAME)[keyof typeof DATE_NAME]

type DateType = {
    [key in DateName]: number
}

const isValidDate = ({ date, month, year }: DateType) => {
    const newDate = new Date(year, month - 1, date)
    return newDate.getDate() === date
}

const DateSelect = ({ name: nameField, value, onChange, setError, clearError, errorMessage }: Props) => {
    const [date, setDate] = useState<DateType>({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
    })

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        const newDate = { ...date, [name]: Number(value) }

        clearError('date_of_birth')
        if (!isValidDate(newDate)) {
            setError(nameField, { message: 'Ngày tháng không hợp lệ' })
            setDate(newDate)
            return
        }
        if (onChange) {
            onChange(new Date(newDate.year, newDate.month - 1, newDate.date))
        }
    }

    useEffect(() => {
        if (!value) {
            return
        }
        setDate({
            date: value.getDate(),
            month: value.getMonth() + 1,
            year: value.getFullYear()
        })
    }, [value])

    return (
        <div className='items-center gap-x-5 grid grid-cols-12'>
            <div className='col-span-4 text-gray-600 text-right'>Ngày sinh</div>
            <div className='relative col-span-8'>
                <div className='gap-x-4 grid grid-cols-12'>
                    {/* Date */}
                    <select onChange={handleChange} value={date.date} className={selectClassName} name={DATE_NAME.DATE}>
                        {_.range(1, 32).map((i) => (
                            <option key={`date_${i}`} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                    {/* Month */}
                    <select
                        onChange={handleChange}
                        value={date.month}
                        className={selectClassName}
                        name={DATE_NAME.MONTH}
                    >
                        {_.range(1, 13).map((i) => (
                            <option key={`month_${i}`} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                    {/* Year */}
                    <select onChange={handleChange} value={date.year} className={selectClassName} name={DATE_NAME.YEAR}>
                        {_.range(1910, new Date().getFullYear() - 2)
                            .sort((a, b) => b - a)
                            .map((i) => (
                                <option key={`year_${i}`} value={i}>
                                    {i}
                                </option>
                            ))}
                    </select>
                </div>
                {errorMessage && <p className='error'>{errorMessage}</p>}
            </div>
        </div>
    )
}

export default DateSelect
