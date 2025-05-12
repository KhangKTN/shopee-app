import { InputNumber } from '../Input'

interface Prop {
    productQty: number
    buyQty: string
    setBuyQty?: React.Dispatch<React.SetStateAction<string>>
    setUpdateQty?: React.Dispatch<React.SetStateAction<boolean>>
}

const QuantityController = ({ productQty, buyQty, setBuyQty }: Prop) => {
    const handleChangeBuyQty = (e: React.ChangeEvent<HTMLInputElement>) => {
        const qty = e.target.value
        if (!setBuyQty) return
        if (qty === '') {
            setBuyQty(qty)
            return
        }

        let qtyNum = +qty
        if (qtyNum === 0) {
            qtyNum = 1
        } else if (qtyNum > productQty) {
            qtyNum = productQty
        }
        setBuyQty(qtyNum.toString())
    }

    return (
        <div className='flex flex-col'>
            <div className='flex items-center'>
                <div className='flex'>
                    <button
                        onClick={() => +buyQty !== 1 && setBuyQty && setBuyQty((+buyQty - 1).toString())}
                        className='px-3 py-1.5 border rounded-s'
                    >
                        <i className='fa-solid fa-minus'></i>
                    </button>
                    <InputNumber
                        onChange={(e) => handleChangeBuyQty(e)}
                        value={buyQty}
                        className='py-1.5 border-y focus:border-primary outline-none w-12 text-center'
                    />
                    <button
                        onClick={() => +buyQty !== productQty && setBuyQty && setBuyQty((+buyQty + 1).toString())}
                        className='px-3 py-1.5 border rounded-e'
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
