import cx from 'classix'
import { createSearchParams, Link } from 'react-router-dom'
import Button from '~/components/Button'
import Input from '~/components/Input'
import Star from '~/components/Star'
import path from '~/constant/path'
import { QueryConfig } from '../ProductList'

interface Prop {
    categories: Category[]
    queryConfig: QueryConfig
}

const Filter = ({ categories, queryConfig }: Prop) => {
    const { category } = queryConfig

    const getCategoryLink = (id: string) => {
        return { pathname: path.HOME, search: createSearchParams({ ...queryConfig, category: id }).toString() }
    }

    return (
        <>
            {/* Category list */}
            <div className='flex items-center gap-x-3 py-4 border-gray-300 border-b-[1px] text-base'>
                <i className='fa-solid fa-list'></i>
                <Link to={path.HOME} className={`capitalize font-bold`}>
                    tất cả danh mục
                </Link>
            </div>
            <div>
                <ul>
                    {categories.map((e) => (
                        <li
                            key={e._id}
                            className={cx(
                                'relative py-2 pl-3 font-semibold',
                                category === e._id ? 'text-primary' : 'hover:text-primary'
                            )}
                        >
                            {queryConfig.category === e._id && (
                                <i className='top-1/2 absolute text-primary text-lg -translate-x-[calc(100%+6px)] -translate-y-1/2 fa-caret-right fa-solid'></i>
                            )}
                            <Link to={getCategoryLink(e._id)}>{e.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Checkbox filter */}
            <div className='flex items-center gap-x-3 mt-8 pt-4 text-base'>
                <i className='fa-solid fa-filter'></i>
                <Link to={path.HOME} className={`capitalize font-bold`}>
                    bộ lọc tìm kiếm
                </Link>
            </div>
            <div className='mt-5 pb-5 border-gray-300 border-b-[1px]'>
                <div className='my-3 font-semibold capitalize'>Theo danh mục</div>
                <ul>
                    <li className='flex items-center my-2'>
                        <input type='checkbox' id='a' />
                        <label htmlFor='a' className='ms-2 font-medium'>
                            Áo thun
                        </label>
                    </li>
                    <li className='flex items-center my-2'>
                        <input type='checkbox' id='b' />
                        <label htmlFor='b' className='ms-2 font-medium'>
                            Áo thun
                        </label>
                    </li>
                    <li className='flex items-center my-2'>
                        <input type='checkbox' id='c' />
                        <label htmlFor='c' className='ms-2 font-medium'>
                            Áo thun
                        </label>
                    </li>
                </ul>
            </div>
            <div className='mt-5 pb-5 border-gray-300 border-b-[1px]'>
                <div className='my-3 font-semibold capitalize'>nơi bán</div>
                <ul>
                    <li className='flex items-center my-2'>
                        <input type='checkbox' id='a' />
                        <label htmlFor='a' className='ms-2 font-medium'>
                            Hà Nội
                        </label>
                    </li>
                    <li className='flex items-center my-2'>
                        <input type='checkbox' id='b' />
                        <label htmlFor='b' className='ms-2 font-medium'>
                            Tp. Hồ Chí Minh
                        </label>
                    </li>
                    <li className='flex items-center my-2'>
                        <input type='checkbox' id='c' />
                        <label htmlFor='c' className='ms-2 font-medium'>
                            Huế
                        </label>
                    </li>
                </ul>
            </div>
            <div className='mt-5 pb-5 border-gray-300 border-b-[1px]'>
                <div className='my-3 font-semibold capitalize'>đơn vị vận chuyển</div>
                <ul>
                    <li className='flex items-center my-2'>
                        <input type='checkbox' name='' id='a' />
                        <label htmlFor='a' className='ms-2 font-medium capitalize'>
                            hoả tốc
                        </label>
                    </li>
                    <li className='flex items-center my-2'>
                        <input type='checkbox' name='' id='b' />
                        <label htmlFor='b' className='ms-2 font-medium capitalize'>
                            nhanh
                        </label>
                    </li>
                    <li className='flex items-center my-2'>
                        <input type='checkbox' name='' id='c' />
                        <label htmlFor='c' className='ms-2 font-medium capitalize'>
                            tiết kiệm
                        </label>
                    </li>
                </ul>
            </div>
            {/* Price */}
            <div className='mt-5 pb-5 border-gray-300 border-b-[1px]'>
                <div className='my-3 font-semibold capitalize'>Khoảng giá</div>
                <div className='flex items-center gap-x-3 mt-4'>
                    <Input
                        className='grow'
                        classNameInput='w-full py-1 rounded-sm pl-1 outline-none border border-gray-300 focus:border-gray-400'
                        name='minPrice'
                        placeholder='đ TỪ'
                        type='text'
                    />
                    <div className='bg-gray-400 w-4 h-[1px]'></div>
                    <Input
                        className='grow'
                        classNameInput='w-full py-1 rounded-sm pl-1 outline-none border border-gray-300 focus:border-gray-400'
                        name='minPrice'
                        placeholder='đ ĐẾN'
                        type='text'
                    />
                </div>
                <Button children='Áp dụng' className='mt-4 px-4 py-2 rounded-sm w-full uppercase' />
            </div>
            {/* Rating */}
            <div className='mt-5 pb-5 border-gray-300 border-b-[1px]'>
                <p className='my-3 font-semibold capitalize'>Đánh giá</p>
                <Star star={5} />
                <Star star={4} isShowText />
                <Star star={3} isShowText />
                <Star star={2} isShowText />
            </div>
            <Button children='Xoá tất cả' className='mt-5 px-4 py-2 rounded-sm w-full uppercase' />
        </>
    )
}

export default Filter
