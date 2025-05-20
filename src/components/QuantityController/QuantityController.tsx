import cx from 'classix'
import { useEffect, useState } from 'react'
import { InputNumber } from '../Input'

type HandleUpdateType =
    | { mode: 'state'; handleUpdate: React.Dispatch<React.SetStateAction<string>> } // Set state for parent component
    | { mode: 'custom'; handleUpdate: (id: string, value: number) => void } // Call api update data

type Prop = {
    id: string
    productQty: number
    buyQty: string
    disabled?: boolean
} & HandleUpdateType

const QuantityController = ({ id, productQty, buyQty, disabled, mode, handleUpdate }: Prop) => {
    // Use to show change input value, when Update API has not been called yet
    const [displayValue, setDisplayValue] = useState(buyQty)

    useEffect(() => {
        setDisplayValue(buyQty)
    }, [buyQty])

    const handleQtyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.trim()

        // Input empty
        if (input === '') {
            const emptyHandler = mode === 'state' ? handleUpdate : setDisplayValue
            emptyHandler(input)
            return
        }

        // Handle limit input
        const qtyNum = Math.min(Math.max(1, +input), productQty)

        const handler = mode === 'state' ? handleUpdate : setDisplayValue
        handler(qtyNum.toString())
    }

    const handleQtyButton = (step: -1 | 1) => {
        const qtyNum = Number(buyQty)
        const newQty = qtyNum + step
        if (newQty < 1 || newQty > productQty) {
            return
        }

        if (mode === 'state') {
            handleUpdate(newQty.toString())
        } else {
            setDisplayValue(newQty.toString())
            handleUpdate(id, newQty)
        }
    }

    return (
        <div className='flex flex-col'>
            <div className='flex items-center'>
                <div className='flex'>
                    <button
                        disabled={disabled}
                        onClick={() => handleQtyButton(-1)}
                        className={cx('px-3 py-1.5 border rounded-s', disabled && 'bg-zinc-50 cursor-not-allowed')}
                    >
                        <i className='fa-solid fa-minus'></i>
                    </button>
                    <InputNumber
                        onBlur={() =>
                            displayValue && displayValue !== buyQty
                                ? handleUpdate(id, +displayValue)
                                : setDisplayValue(buyQty)
                        }
                        onChange={handleQtyInput}
                        value={displayValue}
                        disabled={disabled}
                        className='py-1.5 border-y focus:border-primary outline-none w-12 text-center'
                    />
                    <button
                        disabled={disabled}
                        onClick={() => handleQtyButton(1)}
                        className={cx('px-3 py-1.5 border rounded-e', disabled && 'bg-zinc-50 cursor-not-allowed')}
                    >
                        <i className='fa-solid fa-plus'></i>
                    </button>
                </div>
            </div>
            {+displayValue === productQty && (
                <span className='mt-2.5 text-primary text-sm'>Bạn đã chọn tối đa số lượng sản phẩm</span>
            )}
        </div>
    )
}

export default QuantityController
