import { Link } from 'react-router-dom'
import { ImageLoad } from '~/components/Loading'
import productUtil from '~/utils/productUtil'

const Product = ({ product }: { product: Product }) => {
    return (
        <Link to={productUtil.slugifyUrl({ id: product._id, name: product.name })}>
            <div className='bg-white shadow-sm hover:shadow rounded overflow-hidden transition-transform hover:-translate-y-[4px] duration-200'>
                {/* Image */}
                <div className='relative pt-[100%] w-full'>
                    <ImageLoad img={product.image} />
                </div>
                <div className='px-2 py-3 overflow-hidden'>
                    <div className='min-h-[42px] font-medium line-clamp-2'>{product.name}</div>
                    {/* Price */}
                    <div className='flex items-center mt-2'>
                        <div className='flex max-w-[60%] font-semibold truncate'>
                            <span className='mt-1.5 text-primary text-xs underline'>đ</span>
                            <span className='text-primary text-base'>{productUtil.formatVnd(product.price)}</span>
                        </div>
                        {product.price < product.price_before_discount && (
                            <span className='bg-primary/15 ml-4 p-0.5 rounded-sm font-medium text-primary text-xs'>
                                -{productUtil.calcDiscountPercent(product.price, product.price_before_discount)}%
                            </span>
                        )}
                    </div>
                    {/* Rating and Sold */}
                    <div className='mt-2.5 min-h-4 text-xs'>
                        {product.rating > 0 && (
                            <span>
                                <i className='mr-1 text-yellow-300 fa-solid fa-star'></i>
                                {product.rating}
                            </span>
                        )}
                        {product.sold > 0 && (
                            <span className='ml-2 pl-2 border-gray-300 border-l-[1px]'>
                                {productUtil.formatQuantity(product.sold)} đã bán
                            </span>
                        )}
                    </div>
                    {/* Shipping */}
                    <div className='mt-2 text-xs line-clamp-1'>
                        <span className='text-emerald-500'>
                            <i className='fa-solid fa-truck-fast'></i> 3 - 4 ngày
                        </span>
                        <span className='ml-2 pl-2 border-gray-300 border-l-[1px] font-light text-gray-500'>
                            <i className='fa-solid fa-location-dot'></i> TP. Hồ Chí Minh
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Product
