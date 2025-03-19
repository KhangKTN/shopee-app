import { Link } from 'react-router-dom'
import productUtil from '~/utils/productUtil'

const Product = ({ product }: { product: Product }) => {

    return (
        <Link to='/'>
            <div className='bg-white shadow rounded-sm hover:shadow-md hover:-translate-y-[2px] transition-transform duration-200'>
                <div className='w-full relative pt-[100%]'>
                    <img src={product.image} className='absolute top-0 left-0 w-full h-full object-cover' alt='' />
                </div>
                <div className='px-2 py-3 overflow-hidden'>
                    <div className='min-h-[42px] line-clamp-2 font-medium'>{product.name}</div>
                    <div className='mt-2'>
                        <span className='text-primary text-xs'>đ</span>
                        <span className='text-primary font-semibold text-base'>{productUtil.formatMoney(product.price)}</span>
                        {product.price < product.price_before_discount && (
                            <span className='bg-primary/15 text-primary text-sm font-medium rounded-sm px-1 py-[2px] ml-3'>
                                -{productUtil.calcDiscount(product.price, product.price_before_discount)}%
                            </span>
                        )}
                    </div>
                    <div className='mt-2.5 text-xs min-h-4'>
                        {product.rating > 0 && (
                            <span>
                                <i className='fa-solid fa-star text-yellow-300 mr-2'></i>
                                {product.rating}
                            </span>
                        )}
                        {product.sold > 0 && (
                            <span className='ml-2 pl-2 border-l-[1px] border-gray-300'>
                                {productUtil.formatQuantity(product.sold)} đã bán
                            </span>
                        )}
                    </div>
                    <div className='mt-2 text-xs line-clamp-1'>
                        <span className='text-emerald-500'>
                            <i className='fa-solid fa-truck-fast'></i> 3 - 4 ngày
                        </span>
                        <span className='ml-2 pl-2 border-l-[1px] border-gray-300 font-light text-gray-500'>
                            <i className='fa-solid fa-location-dot'></i> TP. Hồ Chí Minh
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Product
