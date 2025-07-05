import cx from 'classix'
import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { purchaseNavLinks } from '~/constant/purchase'
import productUtil from '~/utils/productUtil'
import { ItemPurchase } from '../HistoryPurchase'

interface Prop {
    purchase: ItemPurchase
}

export const PurchaseStatus = {
    CART: -1,
    ALL: 0,
    CONFIRMING: 1,
    TAKING: 2,
    SHIPPING: 3,
    DELIVERED: 4,
    CANCELED: 5
} as const

const getDisplayStatus = (type: PurchaseStatus) => purchaseNavLinks.find((i) => i.type === type)?.name

const PurchaseItem = ({ purchase }: Prop) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div className='bg-white px-6 py-4 rounded w-full'>
            <Link to={`${productUtil.slugifyUrl({ id: purchase.product._id, name: purchase.product.name })}`}>
                {/* Summary */}
                <div className='flex justify-between pb-4 border-gray-100 border-b-[1px]'>
                    {/* Shop name */}
                    <div className='flex items-center gap-x-2'>
                        <svg width='17' height='16' viewBox='0 0 17 16'>
                            <title>Shop Icon</title>
                            <path
                                d='M1.95 6.6c.156.804.7 1.867 1.357 1.867.654 0 1.43 0 1.43-.933h.932s0 .933 1.155.933c1.176 0 1.15-.933 1.15-.933h.984s-.027.933 1.148.933c1.157 0 1.15-.933 1.15-.933h.94s0 .933 1.43.933c1.368 0 1.356-1.867 1.356-1.867H1.95zm11.49-4.666H3.493L2.248 5.667h12.437L13.44 1.934zM2.853 14.066h11.22l-.01-4.782c-.148.02-.295.042-.465.042-.7 0-1.436-.324-1.866-.86-.376.53-.88.86-1.622.86-.667 0-1.255-.417-1.64-.86-.39.443-.976.86-1.643.86-.74 0-1.246-.33-1.623-.86-.43.536-1.195.86-1.895.86-.152 0-.297-.02-.436-.05l-.018 4.79zM14.996 12.2v.933L14.984 15H1.94l-.002-1.867V8.84C1.355 8.306 1.003 7.456 1 6.6L2.87 1h11.193l1.866 5.6c0 .943-.225 1.876-.934 2.39v3.21z'
                                strokeWidth='.3'
                                stroke='#333'
                                fill='#333'
                                fillRule='evenodd'
                            ></path>
                        </svg>
                        <span>{purchase.shop.name}</span>
                    </div>
                    {/* Status */}
                    <div className='font-medium text-primary uppercase'>{getDisplayStatus(purchase.status)}</div>
                </div>
                {/* Product info */}
                <div className='gap-x-2 grid grid-cols-12 py-4 border-gray-100 border-b-[1px]'>
                    {/* Image */}
                    <div
                        className={cx(
                            !loaded && 'animate-pulse',
                            'relative pt-[100%] col-span-1 overflow-hidden border-[1px] border-gray-200'
                        )}
                    >
                        <img
                            className={cx(
                                'absolute inset-0 size-full object-fill transition-opacity duration-200 pointer-events-none',
                                loaded ? 'opacity-100' : 'opacity-0'
                            )}
                            src={purchase.product.image}
                            onLoad={() => setLoaded(true)}
                        />
                    </div>
                    {/* Detail info */}
                    <div className='flex justify-between items-center col-span-11'>
                        <div className='flex-1'>
                            <h2 className='max-w-[70%] text-base capitalize'>{purchase.product.name}</h2>
                            <span>x1</span>
                        </div>
                        <div className='text-base'>
                            {purchase.product.price_before_discount !== purchase.product.price && (
                                <span className='text-gray-400 line-through'>
                                    ₫{productUtil.formatVnd(purchase.product.price_before_discount)}
                                </span>
                            )}
                            <span className='ml-2 text-primary'>₫{productUtil.formatVnd(purchase.product.price)}</span>
                        </div>
                    </div>
                </div>
            </Link>
            {/* Total price */}
            <div className='pt-4 w-full text-right'>
                <span className='text-base'>Thành tiền:</span>
                <span className='ml-2 font-semibold text-primary text-lg'>
                    ₫{productUtil.formatVnd(purchase.product.price)}
                </span>
            </div>
        </div>
    )
}

export default memo(PurchaseItem)
