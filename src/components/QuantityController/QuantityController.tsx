import { InputNumber } from '../Input'

interface Prop {
    productQty: number
    buyQty: string
    setBuyQty: React.Dispatch<React.SetStateAction<string>>
    setUpdateQty?: React.Dispatch<React.SetStateAction<boolean>>
}

const QuantityController = ({ productQty, buyQty, setBuyQty }: Prop) => {
    const handleChangeBuyQty = (e: React.ChangeEvent<HTMLInputElement>) => {
        const qty = e.target.value
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
        <>
            <div className='flex items-center mt-12'>
                <span className='min-w-[100px] text-gray-500 capitalize'>Số lượng</span>
                <div className='flex mr-5'>
                    <button
                        onClick={() => +buyQty !== 1 && setBuyQty((+buyQty - 1).toString())}
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
                        onClick={() => +buyQty !== productQty && setBuyQty((+buyQty + 1).toString())}
                        className='px-3 py-1.5 border rounded-e'
                    >
                        <i className='fa-solid fa-plus'></i>
                    </button>
                </div>
                <span className='text-gray-400'>{productQty} sản phẩm có sẵn</span>
            </div>
            {+buyQty === productQty && (
                <p className='mt-2.5 ml-[100px] text-primary text-sm'>Bạn đã chọn tối đa số lượng sản phẩm</p>
            )}
        </>
    )
}

export default QuantityController
