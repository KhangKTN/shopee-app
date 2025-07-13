import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import purchaseApi from '~/apis/purchase.api'
import Button from '~/components/Button'
import Checkbox from '~/components/Checkbox'
import SpinnerLoader from '~/components/Loading/SpinnerLoader'
import { PurchaseStatus } from '~/constant/purchase'
import { useCounterStore } from '~/store/useCartStore'
import productUtil from '~/utils/productUtil'
import CartProducts from './CartProducts/CartProducts'

const Cart = () => {
    const location = useLocation()
    const { cart: productExtraList, setCart: setProductExtra } = useCounterStore()

    const {
        data: cartData,
        isFetching,
        isPending,
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
    }, [cartProductList, location.state?.productId])

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
        <div className='bg-neutral-100 py-10 h-full'>
            {isFetching && isPending ? (
                <SpinnerLoader />
            ) : (
                /* Render items cart */
                <div className='mx-auto overflow-x-auto container'>
                    <div className='min-w-[1000px]'>
                        <CartProducts
                            productExtraList={productExtraList}
                            handleCheck={handleCheck}
                            handleDelete={handleDelete}
                            isCheckedAll={isCheckedAll}
                        />
                    </div>
                </div>
            )}

            {/* Summary cart */}
            {productExtraList.length > 0 && (
                <div className='bottom-0 z-10 sticky flex lg:flex-row flex-col justify-between bg-white mx-auto mt-5 px-4 py-5 border-primary border-t-2 rounded-sm container'>
                    <div className='flex items-center text-base capitalize'>
                        <Checkbox id='' checked={isCheckedAll} onChange={handleCheck} />
                        <label htmlFor='select_all' className='ml-2 cursor-pointer'>
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
