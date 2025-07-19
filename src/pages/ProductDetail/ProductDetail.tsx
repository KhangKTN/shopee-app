import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { convert } from 'html-to-text'
import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from '~/apis/product.api'
import purchaseApi from '~/apis/purchase.api'
import AlertSuccess from '~/components/AlertSuccess'
import { ProductDetailLoading, ProductLoading } from '~/components/Loading'
import QuantityController from '~/components/QuantityController'
import Star from '~/components/Star'
import path from '~/constant/path'
import { PurchaseStatus } from '~/constant/purchase'
import productUtil from '~/utils/productUtil'
import { Product } from '../ProductList'
import ProductImages from './ProductImages'
import ProductNotFound from './ProductNotFound'

const DAY_IN_MILISECOND = 24 * 60 * 60 * 1000

const calcShippingDay = (): string => {
    const currentDate = new Date().getTime()
    return (
        new Date(currentDate + 2 * DAY_IN_MILISECOND).toDateString() +
        ' - ' +
        new Date(currentDate + 3 * DAY_IN_MILISECOND).toDateString()
    )
}

const ProductDetail = () => {
    const { productLink } = useParams()
    const navigate = useNavigate()
    const [buyQty, setBuyQty] = useState('1')
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const queryClient = useQueryClient()
    const { t } = useTranslation('product')

    // Extract id from url
    const id = useMemo(() => {
        const pid = productLink?.slice(productLink.lastIndexOf('-'))
        return pid?.split('.')[1]
    }, [productLink])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' })
    }, [id])

    const { data: product, isFetching: isFetchingProduct } = useQuery({
        queryKey: ['product', id],
        queryFn: () => productApi.getProductDetail(id as string),
        enabled: Boolean(id)
    })

    const queryConfig: ProductQuery = { page: '1', limit: 12, category: product?.data.data.category._id, exclude: id }
    const { data: productRelateds, isFetching: isFetchingRelatedProduct } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return productApi.getProductList(queryConfig)
        },
        staleTime: 1 * 60 * 1000, // Use cache data, avoid api callback
        enabled: Boolean(product)
    })

    const addCartMutation = useMutation({
        mutationFn: (data: { product_id: string; buy_count: number }) => purchaseApi.addToCart(data),
        onSuccess: () => {
            // Trigger call api get items in cart
            queryClient.invalidateQueries({ queryKey: ['purchases', PurchaseStatus.CART] })
            setShowAlertSuccess(true)
            setTimeout(() => {
                setShowAlertSuccess(false)
            }, 1500)
        }
    })

    if (!id) {
        return <ProductNotFound />
    }

    const handleAddToCart = () => {
        addCartMutation.mutate({ product_id: id as string, buy_count: Number(buyQty) })
    }

    const buyNow = async () => {
        if (!id) {
            return
        }
        const res = await addCartMutation.mutateAsync({ product_id: id, buy_count: 1 })
        navigate(path.CART, { state: { productId: res.data.data._id } })
    }

    // const foundRelatedProducts = (productRelateds?.data.data.products.length ?? 0) > 0
    const productData = product?.data.data

    if (isFetchingProduct) {
        return <ProductDetailLoading />
    }
    if (!productData) {
        return <ProductNotFound />
    }

    const { images, name, rating, sold, price, price_before_discount, quantity, description } = productData

    return (
        <main className='bg-gray-200 py-6'>
            <Helmet>
                <title>{name}</title>
                <meta name='description' content={convert(description, { limits: { maxInputLength: 200 } })} />
            </Helmet>
            {/* Summary */}
            <section className='bg-white shadow mx-auto p-4 rounded container'>
                <div className='gap-x-8 grid grid-cols-12'>
                    {/* Product images */}
                    <div className='col-span-5'>
                        <ProductImages name={name} images={images} />
                    </div>
                    {/* Product info */}
                    <div className='col-span-7'>
                        <h1 className='font-medium text-2xl'>{name}</h1>
                        {/* Rating and sold */}
                        <div className='flex items-center gap-x-2 mt-3'>
                            <div className='flex items-center'>
                                <span className='mr-1 font-medium text-base'>{rating}</span>
                                <Star star={rating} />
                            </div>
                            <span className='pl-2 border-gray-300 border-l-[1px]'>
                                <span className='font-semibold'>{sold}</span> {t('sold')}
                            </span>
                        </div>
                        {/* Price */}
                        <div className='flex bg-gray-50 mt-12 px-5 py-3 rounded'>
                            <span className='mr-0.5 text-primary text-3xl underline'>đ</span>
                            <h2 className='font-medium text-primary text-3xl'>{productUtil.formatVnd(price)}</h2>
                            {price_before_discount > price && (
                                <>
                                    <span className='ml-5 text-gray-400 text-lg underline'>đ</span>
                                    <h2 className='ml-0.5 text-gray-400 text-lg line-through'>
                                        {productUtil.formatVnd(price_before_discount)}
                                    </h2>
                                </>
                            )}
                            {price_before_discount && price < price_before_discount && (
                                <div className='flex items-center bg-primary/10 my-auto ml-10 px-2 py-1 rounded h-fit font-bold text-primary text-xs uppercase'>
                                    -
                                    {productUtil.calcDiscountPercent(
                                        productData.price,
                                        productData.price_before_discount
                                    )}
                                    %
                                </div>
                            )}
                        </div>
                        {/* Shipping */}
                        <div className='flex items-start mt-5'>
                            <h2 className='min-w-[100px] text-gray-500 capitalize'>{t('shipping')}</h2>
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
                                {t('confidence')}
                            </span>
                            <img
                                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/fd303700dd252abf3771.svg'
                                alt='img_verify'
                                className='mr-2 h-fit'
                            />
                            <p>{t('confidence_detail')}</p>
                        </div>
                        {/* Quantity */}
                        <div className='flex items-center mt-12'>
                            <span className='min-w-[100px] text-gray-500 capitalize'>{t('quantity')}</span>
                            <QuantityController
                                mode='state'
                                id={id || ''}
                                productQty={quantity}
                                buyQty={buyQty}
                                handleUpdate={setBuyQty}
                            />
                            <span className='ml-5 text-gray-400'>
                                {quantity} {t('product_available')}
                            </span>
                        </div>
                        {/* Action button */}
                        <div className='flex gap-x-4 mt-10'>
                            <button
                                onClick={handleAddToCart}
                                className='flex items-center gap-x-2 bg-primary/10 hover:bg-primary/5 px-5 py-2.5 border-[1.5px] border-primary rounded h-12 text-primary transition-colors'
                                disabled={addCartMutation.isPending}
                            >
                                <img
                                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/f600cbfffbe02cc144a1.svg'
                                    alt='shopping_cart'
                                    className='size-5'
                                />
                                {t('add_to_cart')}
                            </button>
                            <button
                                onClick={() => buyNow()}
                                className='bg-primary hover:opacity-80 px-8 rounded h-12 text-white transition-opacity'
                            >
                                {price_before_discount > price ? (
                                    <>
                                        <div className='text-sm capitalize'>{t('buy_voucher')}</div>
                                        <div className='font-medium text-lg leading-none'>
                                            đ{productUtil.formatVnd(price_before_discount - price)}
                                        </div>
                                    </>
                                ) : (
                                    <span>{t('buy_now')}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Description */}
            <section className='bg-white shadow mx-auto mt-5 p-4 rounded container'>
                <div className='bg-gray-100 py-2 pl-3 rounded font-medium text-base uppercase'>
                    {t('product_description')}
                </div>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} className='mt-4 px-3'></p>
            </section>
            {/* Related products */}
            <div className='mx-auto container'>
                <h2 className='mt-8 font-medium text-gray-500 text-lg uppercase'>{t('may_also_like')}</h2>
                <div className='gap-x-3 gap-y-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-5'>
                    {isFetchingRelatedProduct ? (
                        <ProductLoading />
                    ) : (
                        productRelateds?.data.data.products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))
                    )}
                </div>
            </div>
            {/* Show alert when add to cart success */}
            {showAlertSuccess && <AlertSuccess text='Sản phẩm đã được thêm vào giỏ hàng' />}
        </main>
    )
}

export default ProductDetail
