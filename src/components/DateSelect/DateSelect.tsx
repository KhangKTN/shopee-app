import range from 'lodash/range'
import { useEffect, useState } from 'react'
import { UseFormClearErrors, UseFormSetError } from 'react-hook-form'

const selectClassName =
    'col-span-4 px-4 py-2 border hover:border border-gray-200 hover:border-primary/50 rounded outline-none'

interface Props {
    name: 'date_of_birth'
    value: string
    onChange?: (value: string) => void
    setError: UseFormSetError<{ date_of_birth?: string | undefined }>
    clearError: UseFormClearErrors<{ date_of_birth?: string | undefined }>
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

const DateSelect = ({ value, onChange, errorMessage }: Props) => {
    const [date, setDate] = useState<DateType>()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        const newDate = { ...date, [name]: Number(value) }

        // clearError('date_of_birth')
        // if (!isValidDate(newDate)) {
        //     setError(nameField, { message: 'Ngày tháng không hợp lệ' })
        //     setDate(newDate)
        //     return
        // }
        if (onChange) {
            onChange(`${newDate.year}-${newDate.month}-${newDate.date}`)
        }
    }

    useEffect(() => {
        if (!value) {
            return
        }

        const [year, month, date] = value.split('-')
        setDate({
            date: Number(date),
            month: Number(month),
            year: Number(year)
        })
    }, [value])

    return (
        <div className='items-center gap-x-5 grid grid-cols-12'>
            <div className='col-span-4 text-gray-600 text-right'>Ngày sinh</div>
            <div className='relative col-span-8'>
                <div className='gap-x-4 grid grid-cols-12'>
                    {/* Date */}
                    <select
                        onChange={handleChange}
                        value={date?.date}
                        className={selectClassName}
                        name={DATE_NAME.DATE}
                    >
                        {range(1, 32).map((i) => (
                            <option key={`date_${i}`} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                    {/* Month */}
                    <select
                        onChange={handleChange}
                        value={date?.month}
                        className={selectClassName}
                        name={DATE_NAME.MONTH}
                    >
                        {range(1, 13).map((i) => (
                            <option key={`month_${i}`} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                    {/* Year */}
                    <select
                        onChange={handleChange}
                        value={date?.year}
                        className={selectClassName}
                        name={DATE_NAME.YEAR}
                    >
                        {range(1910, new Date().getFullYear() - 2)
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
