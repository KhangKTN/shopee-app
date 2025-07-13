import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import purchaseApi from '~/apis/purchase.api'
import Checkbox from '~/components/Checkbox'
import QuantityController from '~/components/QuantityController'
import path from '~/constant/path'
import { useCounterStore } from '~/store/useCartStore'
import productUtil from '~/utils/productUtil'

interface Prop {
    productExtraList: ProductExtra[]
    handleCheck: (checkAll: boolean, id?: string) => void
    handleDelete: (id: string) => void
    isCheckedAll: boolean
}

const CartProducts = ({ productExtraList, handleCheck, handleDelete, isCheckedAll }: Prop) => {
    const { setCart: setProductExtra } = useCounterStore()

    const updateCartMutation = useMutation({
        mutationFn: purchaseApi.updatePurchase
    })

    const handleChangeQuantity = async (id: string, value: number) => {
        const purchase = productExtraList.find((i) => i._id === id)
        if (!purchase) {
            return
        }
        setProductExtra(productExtraList.map((item) => (item._id === id ? { ...item, disabled: true } : item)))
        await updateCartMutation.mutateAsync({ product_id: purchase.product._id, buy_count: value })

        // Set disable false
        const newProductList = [...productExtraList]
        const updateIdx = newProductList.findIndex((i) => i._id === id)
        if (updateIdx === -1) {
            return
        }
        newProductList[updateIdx].disabled = false
        newProductList[updateIdx].buy_count = value
        setProductExtra(newProductList)
    }

    if (productExtraList.length === 0) {
        return (
            <div className='text-center'>
                <img
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/ef577a25315c384ed114.png'
                    alt='empty_cart'
                    className='mx-auto size-32'
                />
                <div className='font-medium text-gray-400 text-lg text-center tracking-wide'>Giỏ hàng trống</div>
                <Link
                    className='inline-block bg-primary hover:opacity-80 mt-5 px-8 py-2 rounded-sm text-white text-lg uppercase transition-opacity'
                    to={path.HOME}
                >
                    Mua Ngay
                </Link>
            </div>
        )
    }

    return (
        <>
            <div className='items-center grid grid-cols-12 bg-white mb-3 px-8 py-4 font-medium capitalize'>
                <div className='flex items-center col-span-6'>
                    <Checkbox id={undefined} checked={isCheckedAll} onChange={handleCheck} />
                    <div className='ml-2'>Sản phẩm</div>
                </div>
                <div className='col-span-1 text-gray-500 text-center'>Đơn giá</div>
                <div className='col-span-2 text-gray-500 text-center'>Số lượng</div>
                <div className='col-span-2 text-gray-500 text-center'>Thành tiền</div>
                <div className='col-span-1 text-gray-500 text-center'>Thao tác</div>
            </div>
            <div className='bg-white px-4 py-6 rounded-sm'>
                {productExtraList.map((productExtra) => (
                    <div
                        key={productExtra._id}
                        className='items-center grid grid-cols-12 mt-3 first:mt-0 px-4 py-8 border-[1px] border-gray-200 rounded-sm font-medium'
                    >
                        <div className='flex items-center gap-x-2 col-span-6'>
                            <Checkbox id={productExtra._id} checked={productExtra.checked} onChange={handleCheck} />
                            <div className='flex gap-x-3'>
                                <Link
                                    to={productUtil.slugifyUrl({
                                        id: productExtra.product._id,
                                        name: productExtra.product.name
                                    })}
                                >
                                    <img
                                        className='rounded-sm size-[80px] object-cover'
                                        src={productExtra.product.image}
                                        alt={productExtra.product.name}
                                    />
                                </Link>
                                <Link
                                    className='max-w-[80%] h-fit hover:text-primary'
                                    to={productUtil.slugifyUrl({
                                        id: productExtra.product._id,
                                        name: productExtra.product.name
                                    })}
                                >
                                    {productExtra.product.name}
                                </Link>
                            </div>
                        </div>
                        <div className='col-span-1 text-center'>đ{productUtil.formatVnd(productExtra.price)}</div>
                        <div className='col-span-2 mx-auto text-gray-500'>
                            <QuantityController
                                mode='custom'
                                id={productExtra._id}
                                disabled={productExtra.disabled}
                                buyQty={productExtra.buy_count.toString()}
                                productQty={productExtra.product.quantity}
                                handleUpdate={handleChangeQuantity}
                            />
                        </div>
                        <div className='col-span-2 font-semibold text-primary text-center'>
                            đ{productUtil.formatVnd(productExtra.price * productExtra.buy_count)}
                        </div>
                        <button
                            onClick={() => handleDelete(productExtra._id)}
                            className='col-span-1 bg-primary/10 hover:bg-primary/20 px-4 py-1.5 border-[1px] border-primary rounded text-primary transition-colors'
                        >
                            Xoá
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CartProducts
