import { Link } from 'react-router-dom'
import Button from '~/components/Button'
import Input from '~/components/Input'
import Star from '~/components/Star'
import path from '~/constant/path'

const Filter = () => {
    return (
        <>
            {/* Category list */}
            <div className='border-b-[1px] border-gray-300 py-4 flex gap-x-3 items-center text-base'>
                <i className='fa-solid fa-list'></i>
                <Link to={path.HOME} className={`capitalize font-bold`}>
                    tất cả danh mục
                </Link>
            </div>
            <div>
                <ul>
                    <li className='relative py-2 pl-3 hover:text-primary font-semibold'>
                        <i className='fa-solid fa-caret-right text-lg text-primary absolute top-1/2 -translate-y-1/2 -translate-x-[calc(100%+6px)]'></i>
                        <Link to={path.HOME} className=''>
                            Link 1
                        </Link>
                    </li>
                    <li className='py-2 pl-3 hover:text-primary font-semibold'>
                        <Link to={path.HOME} className=''>
                            Link 1
                        </Link>
                    </li>
                    <li className='py-2 pl-3 hover:text-primary font-semibold'>
                        <Link to={path.HOME} className=''>
                            Link 1
                        </Link>
                    </li>
                    <li className='py-2 pl-3 hover:text-primary font-semibold'>
                        <Link to={path.HOME} className=''>
                            Link 1
                        </Link>
                    </li>
                    <li className='py-2 pl-3 hover:text-primary font-semibold'>
                        <Link to={path.HOME} className=''>
                            Link 1
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Checkbox filter */}
            <div className='mt-10 pt-4 flex gap-x-3 items-center text-base'>
                <i className='fa-solid fa-filter'></i>
                <Link to={path.HOME} className={`capitalize font-bold`}>
                    bộ lọc tìm kiếm
                </Link>
            </div>
            <div className='mt-5 pb-5 border-b-[1px] border-gray-300'>
                <div className='capitalize font-semibold my-3'>Theo danh mục</div>
                <ul>
                    <li className='my-2 flex items-center'>
                        <input type='checkbox' id='a' />
                        <label htmlFor='a' className='ms-2 font-medium '>
                            Áo thun
                        </label>
                    </li>
                    <li className='my-2 flex items-center'>
                        <input type='checkbox' id='b' />
                        <label htmlFor='b' className='ms-2 font-medium '>
                            Áo thun
                        </label>
                    </li>
                    <li className='my-2 flex items-center'>
                        <input type='checkbox' id='c' />
                        <label htmlFor='c' className='ms-2 font-medium '>
                            Áo thun
                        </label>
                    </li>
                </ul>
            </div>
            <div className='mt-5 pb-5 border-b-[1px] border-gray-300'>
                <div className='capitalize font-semibold my-3'>nơi bán</div>
                <ul>
                    <li className='my-2 flex items-center'>
                        <input type='checkbox' id='a' />
                        <label htmlFor='a' className='ms-2 font-medium '>
                            Hà Nội
                        </label>
                    </li>
                    <li className='my-2 flex items-center'>
                        <input type='checkbox' id='b' />
                        <label htmlFor='b' className='ms-2 font-medium '>
                            Tp. Hồ Chí Minh
                        </label>
                    </li>
                    <li className='my-2 flex items-center'>
                        <input type='checkbox' id='c' />
                        <label htmlFor='c' className='ms-2 font-medium '>
                            Huế
                        </label>
                    </li>
                </ul>
            </div>
            <div className='mt-5 pb-5 border-b-[1px] border-gray-300'>
                <div className='capitalize font-semibold my-3'>đơn vị vận chuyển</div>
                <ul>
                    <li className='my-2 flex items-center'>
                        <input type='checkbox' name='' id='a' />
                        <label htmlFor='a' className='ms-2 font-medium capitalize'>
                            hoả tốc
                        </label>
                    </li>
                    <li className='my-2 flex items-center'>
                        <input type='checkbox' name='' id='b' />
                        <label htmlFor='b' className='ms-2 font-medium capitalize'>
                            nhanh
                        </label>
                    </li>
                    <li className='my-2 flex items-center'>
                        <input type='checkbox' name='' id='c' />
                        <label htmlFor='c' className='ms-2 font-medium capitalize'>
                            tiết kiệm
                        </label>
                    </li>
                </ul>
            </div>
            {/* Price */}
            <div className='mt-5 pb-5 border-b-[1px] border-gray-300'>
                <div className='capitalize font-semibold my-3'>Khoảng giá</div>
                <div className='mt-4 flex gap-x-3 items-center'>
                    <Input
                        className='grow'
                        classNameInput='w-full py-1 rounded-sm pl-1 outline-none border border-gray-300 focus:border-gray-400'
                        name='minPrice'
                        placeholder='đ TỪ'
                        type='text'
                    />
                    <div className='h-[1px] w-4 bg-gray-400'></div>
                    <Input
                        className='grow'
                        classNameInput='w-full py-1 rounded-sm pl-1 outline-none border border-gray-300 focus:border-gray-400'
                        name='minPrice'
                        placeholder='đ ĐẾN'
                        type='text'
                    />
                </div>
                <Button children='Áp dụng' className='mt-4 uppercase rounded-sm px-4 py-2 w-full' />
            </div>
            {/* Rating */}
            <div className='mt-5 pb-5 border-b-[1px] border-gray-300'>
                <div className='capitalize font-semibold my-3'>Đánh giá</div>
                <Star star={5} />
                <Star star={4} isShowText />
                <Star star={3} isShowText />
                <Star star={2} isShowText />
            </div>
            <Button children='Xoá tất cả' className='mt-5 uppercase w-full px-4 py-2 rounded-sm' />
        </>
    )
}

export default Filter
