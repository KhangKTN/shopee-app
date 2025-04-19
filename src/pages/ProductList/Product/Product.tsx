import { Link } from 'react-router-dom'
import { ImageLoad } from '~/components/Loading'
import productUtil from '~/utils/productUtil'

const Product = ({ product }: { product: Product }) => {
    return (
        <Link to={productUtil.slugifyUrl({ id: product._id, name: product.name })}>
            <div className='bg-white shadow hover:shadow-md rounded-sm transition-transform hover:-translate-y-[2px] duration-200'>
                <div className='relative pt-[100%] w-full'>
                    <ImageLoad img={product.image} />
                </div>
                <div className='px-2 py-3 overflow-hidden'>
                    <div className='min-h-[42px] font-medium line-clamp-2'>{product.name}</div>
                    <div className='mt-2'>
                        <span className='text-primary text-xs'>đ</span>
                        <span className='font-semibold text-primary text-base'>
                            {productUtil.formatVnd(product.price)}
                        </span>
                        {product.price < product.price_before_discount && (
                            <span className='bg-primary/15 ml-3 px-1 py-[2px] rounded-sm font-medium text-primary text-sm'>
                                -{productUtil.calcDiscountPercent(product.price, product.price_before_discount)}%
                            </span>
                        )}
                    </div>
                    <div className='mt-2.5 min-h-4 text-xs'>
                        {product.rating > 0 && (
                            <span>
                                <i className='mr-2 text-yellow-300 fa-solid fa-star'></i>
                                {product.rating}
                            </span>
                        )}
                        {product.sold > 0 && (
                            <span className='ml-2 pl-2 border-gray-300 border-l-[1px]'>
                                {productUtil.formatQuantity(product.sold)} đã bán
                            </span>
                        )}
                    </div>
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
