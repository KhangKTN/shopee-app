import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from '~/apis/purchase.api'
import path from '~/constant/path'
import { PurchaseStatus } from '~/constant/purchase'
import { AppContext } from '~/contexts/app.context'
import productUtil from '~/utils/productUtil'
import Popover from '../Popover'

const CART_ITEM_SHOW = 5

const Cart = () => {
    const { isAuthenticated } = useContext(AppContext)

    const { data: cartData } = useQuery({
        queryKey: ['purchases', PurchaseStatus.CART],
        queryFn: () => purchaseApi.getListPurchase(PurchaseStatus.CART),
        enabled: isAuthenticated
    })

    const cartProductList = cartData?.data.data

    return (
        <Popover
            popover={
                <div className='bg-white py-3 rounded-sm w-[400px]'>
                    <div className='mb-3 px-3 text-gray-400'>Sản phẩm mới thêm</div>
                    {cartProductList && cartProductList?.length > 0 ? (
                        <div>
                            {cartProductList.slice(0, CART_ITEM_SHOW).map((item) => (
                                <div key={item._id} className='flex items-center gap-x-3 hover:bg-gray-100 mb-2 px-3'>
                                    <img className='size-[60px]' src={item.product.image} alt={item.product.image} />
                                    <span className='flex-1 overflow-hidden truncate'>{item.product.name}</span>
                                    <span className='w-1/4 text-primary text-right'>
                                        đ {productUtil.formatVnd(item.price)}
                                    </span>
                                </div>
                            ))}
                            <div className='flex justify-between items-center mt-3 px-3'>
                                {cartProductList.length > CART_ITEM_SHOW && (
                                    <span className='text-primary'>
                                        {cartProductList.length - CART_ITEM_SHOW} thêm hàng vào giỏ
                                    </span>
                                )}
                                <Link to={path.HOME} className='block bg-primary ml-auto px-4 py-2 rounded text-white'>
                                    Xem giỏ hàng
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center w-full h-[80px]'>
                            <span>Chưa có sản phẩm nào</span>
                        </div>
                    )}
                </div>
            }
        >
            <Link to={path.CART} className='relative'>
                <i className='text-2xl fa-solid fa-cart-shopping'></i>
                <span className='top-0 right-0 absolute flex justify-center items-center bg-white rounded-full size-4 text-primary text-xs -translate-y-1/2 translate-x-1/2'>
                    {cartProductList?.length ?? 0}
                </span>
            </Link>
        </Popover>
    )
}

export default Cart
