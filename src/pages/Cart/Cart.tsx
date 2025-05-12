import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import purchaseApi from '~/apis/purchase.api'
import QuantityController from '~/components/QuantityController'
import { PurchaseStatus } from '~/constant/purchase'
import productUtil from '~/utils/productUtil'

const Cart = () => {
    const { data: cartData } = useQuery({
        queryKey: ['purchases', PurchaseStatus.CART],
        queryFn: () => purchaseApi.getListPurchase(PurchaseStatus.CART)
    })

    const cartProductList = cartData?.data.data

    const calcTotalPrice = (): string | null => {
        if (!cartProductList) {
            return null
        }
        const totalPrice = cartProductList.reduce((prevValue, cur) => (prevValue += cur.price * cur.buy_count), 0)
        return productUtil.formatVnd(totalPrice)
    }

    return (
        <div className='bg-neutral-100 py-10'>
            <div className='mx-auto overflow-auto container'>
                <div className='min-w-[1000px]'>
                    {/* Render items cart */}
                    {cartProductList && cartProductList.length > 0 ? (
                        <>
                            <div className='grid grid-cols-12 bg-white mb-3 px-8 py-4 font-medium capitalize'>
                                <div className='flex items-center col-span-6'>
                                    <input className='mr-3 size-4 accent-primary shrink-0' type='checkbox' />
                                    <div>Sản phẩm</div>
                                </div>
                                <div className='col-span-1 text-gray-500 text-center'>Đơn giá</div>
                                <div className='col-span-2 text-gray-500 text-center'>Số lượng</div>
                                <div className='col-span-2 text-gray-500 text-center'>Thành tiền</div>
                                <div className='col-span-1 text-gray-500 text-center'>Thao tác</div>
                            </div>
                            <div className='bg-white px-4 py-6 rounded-sm'>
                                {cartProductList.map((i) => (
                                    <div
                                        key={i._id}
                                        className='items-center grid grid-cols-12 mt-3 first:mt-0 px-4 py-8 border-[1px] border-gray-200 rounded-sm font-medium'
                                    >
                                        <div className='flex items-center col-span-6'>
                                            <input
                                                id={i._id}
                                                className='mr-3 size-4 accent-primary shrink-0'
                                                type='checkbox'
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
                                                buyQty={i.buy_count.toString()}
                                                productQty={i.product.quantity}
                                            />
                                        </div>
                                        <div className='col-span-2 font-semibold text-primary text-center'>
                                            đ{productUtil.formatVnd(i.price * i.buy_count)}
                                        </div>
                                        <button className='col-span-1 bg-primary/10 hover:bg-primary/20 px-4 py-1.5 border-[1px] border-primary rounded text-primary transition-colors'>
                                            Xoá
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='font-semibold text-primary text-lg text-center'>Giỏ hàng trống</div>
                    )}
                </div>
            </div>
            {/* Summary cart */}
            <div className='bottom-0 z-10 sticky flex lg:flex-row flex-col justify-between bg-white mx-auto mt-5 px-4 py-5 border-primary border-t-2 rounded-sm container'>
                <div className='flex items-center text-base capitalize'>
                    <input id='select_all' type='checkbox' className='mr-2 size-4 accent-primary' />
                    <label htmlFor='select_all'>Chọn tất cả ({cartProductList?.length})</label>
                    <button className='ml-3 pl-3 border-neutral-200 border-l-[1px] hover:text-primary'>Xoá</button>
                </div>
                <div>
                    <span className='mr-5 font-medium text-base'>
                        Tổng cộng (Sản phẩm){': '}
                        <span className='font-semibold text-primary text-xl'>đ{calcTotalPrice()}</span>
                    </span>
                    <Link
                        to=''
                        className='bg-primary px-10 py-3 rounded-sm font-medium text-white text-base capitalize'
                    >
                        Mua hàng
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart
