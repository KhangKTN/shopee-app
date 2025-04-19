import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from '~/apis/product.api'
import { InputNumber } from '~/components/Input'
import { ProductDetailLoading } from '~/components/Loading'
import Star from '~/components/Star'
import productUtil from '~/utils/productUtil'
import ProductImages from './ProductImages'

const DAY_IN_MILISECOND = 24 * 60 * 60 * 1000

const ProductDetail = () => {
    const { productLink } = useParams()
    const [buyQty, setBuyQty] = useState('1')

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' })
    }, [])

    // Extract id from url
    const id = useMemo(() => {
        const pid = productLink?.slice(productLink.lastIndexOf('-'))
        return pid?.split('.')[1]
    }, [productLink])

    const { data } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            // await new Promise((resolve) => setTimeout(resolve, 3000))
            return productApi.getProductDetail(id as string)
        }
    })

    const productData = data?.data.data
    if (!productData) {
        return <ProductDetailLoading />
    }

    const { images, name, rating, sold, price, price_before_discount, quantity, description } = productData

    const calcShippingDay = (): string => {
        const currentDate = new Date().getTime()
        return (
            new Date(currentDate + 2 * DAY_IN_MILISECOND).toDateString() +
            ' - ' +
            new Date(currentDate + 3 * DAY_IN_MILISECOND).toDateString()
        )
    }

    const handleChangeBuyQty = (e: React.ChangeEvent<HTMLInputElement>) => {
        const qty = e.target.value
        if (qty === '') {
            setBuyQty(qty)
            return
        }

        let qtyNum = +qty
        if (qtyNum === 0) {
            qtyNum = 1
        } else if (qtyNum > productData?.quantity) {
            qtyNum = productData?.quantity
        }
        setBuyQty(qtyNum.toString())
    }

    return (
        <main className='bg-gray-200 py-6'>
            {/* Summary */}
            <section className='bg-white shadow mx-auto p-4 rounded container'>
                <div className='gap-x-8 grid grid-cols-12'>
                    {/* Product images */}
                    <div className='col-span-5'>
                        <ProductImages name={name} images={images} />
                    </div>
                    {/* Product info */}
                    <div className='col-span-7'>
                        <h1 className='text-2xl'>{name}</h1>
                        {/* Rating and sold */}
                        <div className='flex items-center gap-x-2 mt-3'>
                            <div className='flex items-center'>
                                <span className='mr-1 text-base'>{rating}</span>
                                <Star star={rating} />
                            </div>
                            <span className='pl-2 border-l-[1px]'>{sold} đã bán</span>
                        </div>
                        {/* Price */}
                        <div className='flex bg-gray-50 mt-12 px-5 py-3 rounded'>
                            <span className='mr-1 text-primary text-lg'>đ</span>
                            <h2 className='font-medium text-primary text-3xl'>{productUtil.formatVnd(price)}</h2>
                            {price_before_discount > price && (
                                <>
                                    <span className='ml-5 text-gray-400 text-base'>đ</span>
                                    <h2 className='ml-1 text-gray-400 text-lg line-through'>
                                        {productUtil.formatVnd(price_before_discount)}
                                    </h2>
                                </>
                            )}
                            {price_before_discount && price < price_before_discount && (
                                <div className='flex items-center bg-primary my-auto ml-10 px-2 py-1 rounded h-fit font-semibold text-white text-xs uppercase'>
                                    {productUtil.calcDiscountPercent(
                                        productData.price,
                                        productData.price_before_discount
                                    )}
                                    % giảm
                                </div>
                            )}
                        </div>
                        {/* Shipping */}
                        <div className='flex items-start mt-5'>
                            <h2 className='min-w-[100px] text-gray-500 capitalize'>Vận chuyển</h2>
                            <div className='flex'>
                                <img
                                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/f1f65ec969d238ed62ff.svg'
                                    alt='img_car_ship'
                                    className='mt-0 h-fit'
                                />
                                <div className='ml-2'>
                                    <p>Nhận từ {calcShippingDay()}</p>
                                    <p className='text-gray-500 text-xs'>
                                        Tặng Voucher ₫15.000 nếu đơn giao sau thời gian trên.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center mt-5'>
                            <span className='min-w-[100px] max-w-[100px] text-gray-500 capitalize'>
                                An tâm mua sắm cùng Shopee
                            </span>
                            <img
                                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/fd303700dd252abf3771.svg'
                                alt='img_verify'
                                className='mr-2 h-fit'
                            />
                            <p>Trả hàng miễn phí 15 ngày · Chính hãng 100% · Miễn phí vận chuyển</p>
                        </div>
                        {/* Quantity */}
                        <div>
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
                                        onClick={() =>
                                            +buyQty !== productData?.quantity && setBuyQty((+buyQty + 1).toString())
                                        }
                                        className='px-3 py-1.5 border rounded-e'
                                    >
                                        <i className='fa-solid fa-plus'></i>
                                    </button>
                                </div>
                                <span className='text-gray-400'>{quantity} sản phẩm có sẵn</span>
                            </div>
                            {+buyQty === quantity && (
                                <p className='mt-2.5 ml-[100px] text-primary text-sm'>
                                    Bạn đã chọn tối đa số lượng sản phẩm
                                </p>
                            )}
                        </div>
                        {/* Action */}
                        <div className='flex gap-x-4 mt-10'>
                            <button className='flex items-center gap-x-2 bg-primary/10 hover:bg-primary/5 px-5 py-2.5 border-[1.5px] border-primary rounded text-primary transition-colors'>
                                <img
                                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/f600cbfffbe02cc144a1.svg'
                                    alt='shopping_cart'
                                    className='size-5'
                                />
                                Thêm vào giỏ hàng
                            </button>
                            <button className='bg-primary hover:opacity-80 px-5 py-2.5 rounded text-white capitalize transition-opacity'>
                                mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Description */}
            <section className='bg-white shadow mx-auto mt-5 p-4 rounded container'>
                <div className='bg-gray-100 py-2 pl-3 rounded font-medium text-base uppercase'>Mô tả sản phẩm</div>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} className='mt-4 px-3'></p>
            </section>
        </main>
    )
}

export default ProductDetail
