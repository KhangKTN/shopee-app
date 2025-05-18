import cx from 'classix'
import { useEffect, useState } from 'react'
import { InputNumber } from '../Input'

type HandleUpdateType =
    | { mode: 'state'; handleUpdate: React.Dispatch<React.SetStateAction<string>> }
    | { mode: 'custom'; handleUpdate: (id: string, value: number) => void }

type Prop = {
    id: string
    productQty: number
    buyQty: string
    disabled?: boolean
} & HandleUpdateType

const QuantityController = ({ id, productQty, buyQty, disabled, mode, handleUpdate }: Prop) => {
    const [displayValue, setDisplayValue] = useState(buyQty)

    useEffect(() => {
        setDisplayValue(buyQty)
    }, [buyQty])

    const handleChangeBuyQty = (e: React.ChangeEvent<HTMLInputElement>) => {
        const qty = e.target.value
        if (qty === '') {
            if (mode === 'state') {
                handleUpdate(qty)
            } else {
                setDisplayValue(qty)
            }
            return
        }

        let qtyNum = +qty
        if (qtyNum === 0) {
            qtyNum = 1
        } else if (qtyNum > productQty) {
            qtyNum = productQty
        }
        if (mode === 'state') {
            handleUpdate(qtyNum.toString())
        } else {
            setDisplayValue(qtyNum.toString())
        }
    }

    const handleIncrease = () => {
        const qtyNum = Number(buyQty)
        if (qtyNum === productQty) {
            return
        }
        const newQty = qtyNum + 1
        if (mode === 'state') {
            handleUpdate(newQty.toString())
        } else {
            handleUpdate(id, newQty)
        }
    }

    const handleDecrease = () => {
        const qtyNum = Number(buyQty)
        if (qtyNum === 1) {
            return
        }
        const newQty = qtyNum - 1
        if (mode === 'state') {
            handleUpdate(newQty.toString())
        } else {
            handleUpdate(id, newQty)
        }
    }

    return (
        <div className='flex flex-col'>
            <div className='flex items-center'>
                <div className='flex'>
                    <button
                        disabled={disabled}
                        onClick={() => handleDecrease()}
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
                        onChange={handleChangeBuyQty}
                        value={displayValue}
                        disabled={disabled}
                        className='py-1.5 border-y focus:border-primary outline-none w-12 text-center'
                    />
                    <button
                        disabled={disabled}
                        onClick={() => handleIncrease()}
                        className={cx('px-3 py-1.5 border rounded-e', disabled && 'bg-zinc-50 cursor-not-allowed')}
                    >
                        <i className='fa-solid fa-plus'></i>
                    </button>
                </div>
            </div>
            {+buyQty === productQty && (
                <p className='mt-2.5 text-primary text-sm'>Bạn đã chọn tối đa số lượng sản phẩm</p>
            )}
        </div>
    )
}

export default QuantityController
