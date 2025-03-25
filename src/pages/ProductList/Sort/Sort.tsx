import { useState } from 'react'
import { Link } from 'react-router-dom'

const Sort = () => {
    const [isShowPrice, setShowPrice] = useState<boolean>(false)
    const isActive: boolean = true
    const isPrev: boolean = true
    const isNext: boolean = true

    return (
        <div className='bg-gray-300/50 px-4 py-3 flex justify-between items-center text-sm rounded-sm'>
            <div className='flex gap-x-3 items-center'>
                <span className='text-base font-medium'>Sắp xếp theo</span>
                <Link
                    to=''
                    className={`px-4 py-2 rounded-sm capitalize ${isActive ? 'bg-primary text-white' : 'bg-white'}`}
                >
                    Phổ biến
                </Link>
                <Link to='' className='px-4 py-2 rounded-sm capitalize bg-white hover:bg-gray-50'>
                    Mới nhất
                </Link>
                <Link to='' className='px-4 py-2 rounded-sm capitalize bg-white hover:bg-gray-50'>
                    Bán chạy
                </Link>
                {/* <div>
                    <select className='px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-sm block w-full focus:outline-none border-r-8 border-transparent'>
                        <option selected disabled>
                            Giá
                        </option>
                        <option value='price:asc'>Thấp đến Cao</option>
                        <option value='price:desc'>Cao đến Thấp</option>
                    </select>
                </div> */}

                <button
                    onMouseEnter={() => setShowPrice(true)}
                    onMouseLeave={() => setShowPrice(false)}
                    className='relative bg-white hover:bg-gray-50 focus:outline-none rounded-sm w-44 px-4 py-2 text-center inline-flex items-center'
                    type='button'
                >
                    Giá{' '}
                    <svg
                        className='w-2.5 h-2.5 ms-auto'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 10 6'
                    >
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m1 1 4 4 4-4'
                        />
                    </svg>
                    {isShowPrice && (
                        <div className='absolute top-full left-1/2 -translate-x-1/2 z-10 bg-white divide-y divide-gray-100 rounded-sm shadow-sm w-44'>
                            <ul className='text-sm'>
                                <li>
                                    <a href='#' className='block pl-4 py-2 hover:bg-gray-50 text-left'>
                                        Giá: Thấp đến Cao
                                    </a>
                                </li>
                                <li>
                                    <a href='#' className='block pl-4 py-2 hover:bg-gray-50 text-left'>
                                        Giá: Cao đến Thấp
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </button>
            </div>
            <div className='flex items-center gap-x-5'>
                <span>
                    <span className='text-primary'>1</span>/9
                </span>
                <div className='flex gap-x-[1px]'>
                    <button
                        className={`size-8 rounded-s-sm hover:bg-gray-50 ${
                            isPrev ? 'text-gray-600 bg-white' : 'text-gray-400 bg-white/50 cursor-not-allowed'
                        }`}
                    >
                        <i className='fa-solid fa-angle-left'></i>
                    </button>
                    <button
                        className={`size-8 rounded-e-sm hover:bg-gray-50 ${
                            isNext ? 'text-gray-600 bg-white' : 'text-gray-400 bg-white/50 cursor-not-allowed'
                        }`}
                    >
                        <i className='fa-solid fa-angle-right'></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sort
