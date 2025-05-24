import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import purchaseApi from '~/apis/purchase.api'
import Button from '~/components/Button'
import SpinnerLoading from '~/components/Loading/SpinnerLoading'
import QuantityController from '~/components/QuantityController'
import { appHeight } from '~/constant/app'
import path from '~/constant/path'
import { PurchaseStatus } from '~/constant/purchase'
import productUtil from '~/utils/productUtil'

interface ProductExtra extends Purchase {
    disabled: boolean
    checked: boolean
}

const Cart = () => {
    const [isFirstLoad, setFirstLoad] = useState(true)
    const [productExtraList, setProductExtra] = useState<ProductExtra[]>([])
    const {
        data: cartData,
        isFetching,
        refetch
    } = useQuery({
        queryKey: ['purchases', PurchaseStatus.CART],
        queryFn: () => purchaseApi.getListPurchase(PurchaseStatus.CART)
    })

    const cartProductList = cartData?.data.data

    useEffect(() => {
        if (cartProductList && cartProductList.length >= 0) {
            const cartProductExtraList: ProductExtra[] = cartProductList.map((product) => ({
                ...product,
                disabled: false,
                checked: Boolean(productExtraList[productExtraList.findIndex((e) => e._id === product._id)]?.checked)
            }))
            setProductExtra(cartProductExtraList)
        }
    }, [cartProductList])

    const calcTotalPrice = () => {
        if (!cartProductList) {
            return null
        }
        const totalPrice = productExtraList
            .filter((i) => i.checked)
            .reduce((prevValue, cur) => (prevValue += cur.price * cur.buy_count), 0)
        return productUtil.formatVnd(totalPrice)
    }

    const isCheckedAll = productExtraList.every((i) => i.checked)
    const countChecked = productExtraList.filter((i) => i.checked).length

    const handleCheck = (checkAll: boolean, id?: string) => {
        if (!productExtraList || productExtraList.length <= 0) {
            return
        }

        if (checkAll) {
            setProductExtra(productExtraList.map((i) => ({ ...i, checked: !isCheckedAll })))
        } else {
            const productCheckedIndex = productExtraList.findIndex((i) => i._id === id)
            if (productCheckedIndex === -1) {
                return
            }
            setProductExtra(productExtraList.map((i) => (i._id === id ? { ...i, checked: !i.checked } : i)))
        }
    }

    const updateCartMutation = useMutation({
        mutationFn: purchaseApi.updatePurchase,
        onSuccess: () => {
            refetch()
        }
    })

    const deleteCartMutation = useMutation({
        mutationFn: purchaseApi.deletePurchase,
        onSuccess: () => {
            refetch()
        }
    })

    const buyProductsMutation = useMutation({
        mutationFn: purchaseApi.buyProducts,
        onSuccess: () => {
            refetch()
            Swal.fire({ text: 'Bạn đã đặt hàng thành công', icon: 'success' })
        }
    })

    const handleChangeQuantity = (id: string, value: number) => {
        const purchase = productExtraList.find((i) => i._id === id)
        if (!purchase) {
            return
        }
        setProductExtra(productExtraList.map((item) => (item._id === id ? { ...item, disabled: true } : item)))
        setFirstLoad(false)
        updateCartMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }

    const handleDelete = (id: string) => {
        // Delete single item
        if (id.trim()) {
            deleteCartMutation.mutate([id])
            return
        }
        const deleteIds = productExtraList.filter((i) => i.checked).map((i) => i._id)
        deleteCartMutation.mutate(deleteIds)
    }

    const buyProducts = () => {
        const productBuy: { product_id: string; buy_count: number }[] = productExtraList
            .filter((i) => i.checked)
            .map((i) => ({ product_id: i.product._id, buy_count: i.buy_count }))
        buyProductsMutation.mutate(productBuy)
    }

    return (
        <div
            style={{
                minHeight: `calc(100vh - ${appHeight.navHeader + appHeight.header + appHeight.footer}px)`
            }}
            className='bg-neutral-100 py-10'
        >
            <div className='mx-auto overflow-auto container'>
                <div className='min-w-[1000px]'>
                    {/* Render items cart */}
                    {isFetching && isFirstLoad ? (
                        <SpinnerLoading />
                    ) : productExtraList.length > 0 ? (
                        <>
                            <div className='grid grid-cols-12 bg-white mb-3 px-8 py-4 font-medium capitalize'>
                                <div className='flex items-center col-span-6'>
                                    <input
                                        onChange={() => handleCheck(true)}
                                        className='mr-3 size-4 accent-primary shrink-0'
                                        type='checkbox'
                                        checked={isCheckedAll}
                                    />
                                    <div>Sản phẩm</div>
                                </div>
                                <div className='col-span-1 text-gray-500 text-center'>Đơn giá</div>
                                <div className='col-span-2 text-gray-500 text-center'>Số lượng</div>
                                <div className='col-span-2 text-gray-500 text-center'>Thành tiền</div>
                                <div className='col-span-1 text-gray-500 text-center'>Thao tác</div>
                            </div>
                            <div className='bg-white px-4 py-6 rounded-sm'>
                                {productExtraList.map((i) => (
                                    <div
                                        key={i._id}
                                        className='items-center grid grid-cols-12 mt-3 first:mt-0 px-4 py-8 border-[1px] border-gray-200 rounded-sm font-medium'
                                    >
                                        <div className='flex items-center col-span-6'>
                                            <input
                                                id={i._id}
                                                className='mr-3 size-4 accent-primary shrink-0'
                                                type='checkbox'
                                                onChange={() => handleCheck(false, i._id)}
                                                checked={i.checked}
                                            />
                                            <div className='flex gap-x-3'>
                                                <Link
                                                    to={productUtil.slugifyUrl({
                                                        id: i.product._id,
                                                        name: i.product.name
                                                    })}
                                                >
                                                    <img
                                                        className='rounded-sm size-[80px] object-cover'
                                                        src={i.product.image}
                                                        alt={i.product.name}
                                                    />
                                                </Link>
                                                <Link
                                                    className='max-w-[80%] h-fit hover:text-primary'
                                                    to={productUtil.slugifyUrl({
                                                        id: i.product._id,
                                                        name: i.product.name
                                                    })}
                                                >
                                                    {i.product.name}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='col-span-1 text-center'>đ{productUtil.formatVnd(i.price)}</div>
                                        <div className='col-span-2 mx-auto text-gray-500'>
                                            <QuantityController
                                                mode='custom'
                                                id={i._id}
                                                disabled={i.disabled}
                                                buyQty={i.buy_count.toString()}
                                                productQty={i.product.quantity}
                                                // handleChangeQuantity={handleChangeQuantity}
                                                handleUpdate={handleChangeQuantity}
                                            />
                                        </div>
                                        <div className='col-span-2 font-semibold text-primary text-center'>
                                            đ{productUtil.formatVnd(i.price * i.buy_count)}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(i._id)}
                                            className='col-span-1 bg-primary/10 hover:bg-primary/20 px-4 py-1.5 border-[1px] border-primary rounded text-primary transition-colors'
                                        >
                                            Xoá
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='text-center'>
                            <img
                                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/ef577a25315c384ed114.png'
                                alt='empty_cart'
                                className='mx-auto size-32'
                            />
                            <div className='font-medium text-gray-400 text-lg text-center tracking-wide'>
                                Giỏ hàng trống
                            </div>
                            <Link
                                className='inline-block bg-primary hover:opacity-80 mt-5 px-8 py-2 rounded-sm text-white text-lg uppercase transition-opacity'
                                to={path.HOME}
                            >
                                Mua Ngay
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {/* Summary cart */}
            {productExtraList.length > 0 && (
                <div className='bottom-0 z-10 sticky flex lg:flex-row flex-col justify-between bg-white mx-auto mt-5 px-4 py-5 border-primary border-t-2 rounded-sm container'>
                    <div className='flex items-center text-base capitalize'>
                        <input
                            id='select_all'
                            onChange={() => handleCheck(true)}
                            checked={isCheckedAll}
                            type='checkbox'
                            className='mr-2 size-4 accent-primary'
                        />
                        <label htmlFor='select_all' className='cursor-pointer'>
                            Chọn tất cả ({productExtraList?.length})
                        </label>
                        <button
                            onClick={() => handleDelete('')}
                            className='ml-3 pl-3 border-neutral-200 border-l-[1px] hover:text-primary'
                        >
                            Xoá
                        </button>
                    </div>
                    <div className='flex items-center'>
                        <span className='mr-5 font-medium text-base'>
                            Tổng cộng ({countChecked} Sản phẩm){': '}
                            <span className='font-semibold text-primary text-xl'>đ{calcTotalPrice()}</span>
                        </span>
                        <Button
                            isLoading={buyProductsMutation.isPending}
                            disabled={buyProductsMutation.isPending || countChecked === 0}
                            onClick={() => buyProducts()}
                            className='bg-primary px-10 py-3 rounded-sm font-medium text-white text-base capitalize'
                        >
                            Mua hàng
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
