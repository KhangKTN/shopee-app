import { yupResolver } from '@hookform/resolvers/yup'
import cx from 'classix'
import _ from 'lodash'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import { InputNumber } from '~/components/Input'
import Star from '~/components/Star'
import path from '~/constant/path'
import { PriceFilterSchema, priceFilterSchema } from '~/utils/validateField'
import { QueryConfig } from '../ProductList'

interface Prop {
    categories: Category[]
    queryConfig: QueryConfig
}

const Filter = ({ categories, queryConfig }: Prop) => {
    const navigate = useNavigate()
    const { category } = queryConfig

    const getCategoryLink = (id: string) => {
        return { pathname: path.HOME, search: createSearchParams({ ...queryConfig, category: id }).toString() }
    }

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        trigger
    } = useForm<PriceFilterSchema>({
        defaultValues: {
            min_price: queryConfig.price_min ?? '',
            max_price: queryConfig.price_max ?? ''
        },
        resolver: yupResolver(priceFilterSchema)
    })

    const onSubmit: SubmitHandler<PriceFilterSchema> = ({ min_price = '', max_price = '' }) => {
        const searchQuery = _.omitBy(
            { ...queryConfig, price_min: min_price, price_max: max_price, page: '1' },
            _.isEmpty
        )
        navigate({
            pathname: path.HOME,
            search: createSearchParams(searchQuery).toString()
        })
    }

    const handleRating = (star: number) => {
        navigate({
            pathname: path.HOME,
            search: createSearchParams({ ...queryConfig, rating_filter: star.toString(), page: '1' }).toString()
        })
    }

    const handleResetFilter = () => {
        reset({ min_price: '', max_price: '' })
        const fieldReset = ['category', 'price_min', 'price_max', 'rating_filter']
        const searchQuery = { ...queryConfig, page: '1' }
        for (const field of fieldReset) {
            delete searchQuery[field as keyof QueryConfig]
        }

        navigate({
            pathname: path.HOME,
            search: createSearchParams(searchQuery).toString()
        })
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
                        <li className='relative py-2 pl-3 font-semibold' key={e._id}>
                            {queryConfig.category === e._id && (
                                <i className='top-1/2 absolute text-primary text-lg -translate-x-[calc(100%+6px)] -translate-y-1/2 fa-caret-right fa-solid'></i>
                            )}
                            <Link
                                className={cx(category === e._id ? 'text-primary' : 'hover:text-primary')}
                                to={getCategoryLink(e._id)}
                            >
                                {e.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Checkbox filter */}
            {/* <div className='flex items-center gap-x-3 mt-8 pt-4 text-base'>
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
            </div> */}
            {/* Price */}
            <div className='mt-5 pb-5 border-gray-300 border-y-[1px]'>
                <div className='my-3 font-semibold capitalize'>Khoảng giá</div>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
                    <div className='flex items-center gap-x-3 w-full'>
                        <Controller
                            name='min_price'
                            control={control}
                            render={({ field }) => (
                                <InputNumber
                                    onChange={field.onChange}
                                    classNameDiv='grow'
                                    className='py-1 pl-1 border border-gray-300 focus:border-gray-400 rounded-sm outline-none w-full'
                                    placeholder='đ TỪ'
                                    type='text'
                                    value={field.value}
                                />
                            )}
                        />
                        <span className='text-gray-200'>-</span>
                        <Controller
                            name='max_price'
                            control={control}
                            render={({ field }) => (
                                <InputNumber
                                    onChange={(e) => {
                                        field.onChange(e)
                                        trigger('min_price')
                                    }}
                                    classNameDiv='grow'
                                    className='py-1 pl-1 border border-gray-300 focus:border-gray-400 rounded-sm outline-none w-full'
                                    placeholder='đ ĐẾN'
                                    type='text'
                                    value={field.value}
                                />
                            )}
                        />
                    </div>
                    <div className='grid grid-cols-2'>
                        {errors?.min_price && <p className='text-start error'>{errors.min_price.message}</p>}
                        {errors?.max_price && <p className='col-start-2 text-end error'>{errors.max_price.message}</p>}
                    </div>
                    <Button type='submit' children='Áp dụng' className='mt-4 px-4 py-2 rounded-sm w-full uppercase' />
                </form>
            </div>
            {/* Rating */}
            <div className='mt-5 pb-5 border-gray-300 border-b-[1px]'>
                <p className='my-3 font-semibold capitalize'>Đánh giá</p>
                <Star star={5} onClick={(star) => handleRating(star)} />
                <Star star={4} isShowText onClick={(star) => handleRating(star)} />
                <Star star={3} isShowText onClick={(star) => handleRating(star)} />
                <Star star={2} isShowText onClick={(star) => handleRating(star)} />
            </div>
            <Button
                onClick={handleResetFilter}
                children='Xoá tất cả'
                className='mt-5 px-4 py-2 rounded-sm w-full uppercase'
            />
        </>
    )
}

export default Filter
