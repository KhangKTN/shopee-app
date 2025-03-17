import { Link } from 'react-router-dom'

const Product = () => {
    return (
        <Link to='/'>
            <div className='bg-white shadow rounded-sm hover:shadow-md hover:-translate-y-[2px] transition-transform duration-200'>
                <div className='w-full relative pt-[100%]'>
                    <img
                        src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvn3wtv6n9waf1.webp'
                        className='absolute top-0 left-0 w-full h-full object-cover'
                        alt=''
                    />
                </div>
                <div className='px-2 py-3 overflow-hidden'>
                    <div className='min-h-[42px] line-clamp-2 font-medium'>
                        Giá Huỷ Diệt - Mẫu M -Nhớt Xe số, xe côn GW GULF WESTERN OIL - 100% SYNTHETIC SAE 5W40 ESTER PAO
                        BLEND Dung Tích 1000ML
                    </div>
                    <div className='mt-2'>
                        <span className='text-primary text-xs'>đ</span>
                        <span className='text-primary font-semibold text-base'>383.000</span>
                        <span className='bg-primary/15 text-primary text-sm font-medium rounded-sm px-1 py-[2px] ml-3'>-19%</span>
                    </div>
                    <div className='mt-2.5 text-xs'>
                        <span>
                            <i className='fa-solid fa-star text-yellow-300 mr-2'></i>
                            5.0
                        </span>
                        <span className='ml-2 pl-2 border-l-[1px] border-gray-300'>55 đã bán</span>
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
