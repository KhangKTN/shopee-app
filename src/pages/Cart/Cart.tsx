import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import purchaseApi from '~/apis/purchase.api'
import Button from '~/components/Button'
import SpinnerLoading from '~/components/Loading/SpinnerLoading'
import { appHeight } from '~/constant/app'
import { PurchaseStatus } from '~/constant/purchase'
import { useCounterStore } from '~/store/useCartStore'
import productUtil from '~/utils/productUtil'
import CartProducts from './CartProducts/CartProducts'

const Cart = () => {
    const location = useLocation()
    const [isFirstLoad, setFirstLoad] = useState(true)
    const { cart: productExtraList, setCart: setProductExtra } = useCounterStore()

    const {
        data: cartData,
        isFetching,
        refetch
    } = useQuery({
        queryKey: ['purchases', { status: PurchaseStatus.CART }],
        queryFn: () => purchaseApi.getListPurchase(PurchaseStatus.CART)
    })

    const cartProductList = cartData?.data.data

    useEffect(() => {
        const clearState = () => {
            history.replaceState(null, '')
        }
        window.addEventListener('beforeunload', clearState)

        return () => {
            window.removeEventListener('beforeunload', clearState)
        }
    }, [])

    useEffect(() => {
        if (!cartProductList) {
            return
        }
        setProductExtra(
            cartProductList.map((cartProduct) => {
                const isBuyNow = cartProduct._id === location.state?.productId
                const extraProductChecked =
                    productExtraList[productExtraList.findIndex((i) => i._id === cartProduct._id)]
                const currentChecked = Boolean(extraProductChecked?.checked)

                return {
                    ...cartProduct,
                    disabled: false,
                    checked: isBuyNow || currentChecked
                }
            })
        )
    }, [cartProductList])

    const calcTotalPrice = useMemo(() => {
        if (!productExtraList) {
            return null
        }
        const totalPrice = productExtraList
            .filter((i) => i.checked)
            .reduce((prevValue, cur) => (prevValue += cur.price * cur.buy_count), 0)

        return productUtil.formatVnd(totalPrice)
    }, [productExtraList])

    const isCheckedAll = useMemo(() => productExtraList.every((i) => i.checked), [productExtraList])
    const countChecked = useMemo(() => productExtraList.filter((i) => i.checked).length, [productExtraList])

    const handleCheck = (checkAll: boolean, id?: string) => {
        if (!productExtraList) {
            return
        }
        if (checkAll) {
            setProductExtra(productExtraList.map((i) => ({ ...i, checked: !isCheckedAll })))
            return
        }

        const productCheckedIndex = productExtraList.findIndex((i) => i._id === id)
        if (productCheckedIndex === -1) {
            return
        }
        setProductExtra(productExtraList.map((i) => (i._id === id ? { ...i, checked: !i.checked } : i)))
    }

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

    const handleDelete = (id: string) => {
        setFirstLoad(false)
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
                    ) : (
                        <CartProducts
                            productExtraList={productExtraList}
                            handleCheck={handleCheck}
                            handleDelete={handleDelete}
                            isCheckedAll={isCheckedAll}
                            setFirstLoad={setFirstLoad}
                        />
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
                            <span className='font-semibold text-primary text-xl'>đ{calcTotalPrice}</span>
                        </span>
                        <Button
                            isLoading={buyProductsMutation.isPending}
                            disabled={buyProductsMutation.isPending || countChecked === 0}
                            onClick={() => buyProducts()}
                            className='bg-primary px-10 py-3 rounded font-medium text-white text-base capitalize'
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
