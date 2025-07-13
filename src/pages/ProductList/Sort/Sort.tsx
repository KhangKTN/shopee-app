import cx from 'classix'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { PrevNextLink } from '~/components/Pagination'
import path from '~/constant/path'
import { OrderEnum, SortByEnum } from '~/constant/product'
import { QueryConfig } from '../ProductList'

interface Prop {
    totalPage: number | undefined
    queryConfig: QueryConfig
}

const buttonSortList: SortByEnum[] = [SortByEnum.VIEW, SortByEnum.CREATED_AT, SortByEnum.SOLD]

type SortByQuery = Exclude<ProductQuery['sort_by'], undefined>

const Sort = ({ queryConfig, totalPage = 0 }: Prop) => {
    const [isShowPrice, setShowPrice] = useState<boolean>(false)
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { sort_by = SortByEnum.CREATED_AT } = queryConfig
    const page = Number(queryConfig.page) || 1

    const isActiveSort = (sortBy: SortByQuery) => {
        return sortBy === sort_by
    }

    const handleClickSort = (sortBy: SortByQuery, order?: OrderEnum) => {
        const searchParams = { ...queryConfig, sort_by: sortBy, ...(order && { order }) }
        if (order) {
            setShowPrice(false)
        } else {
            // Order param only used with sortBy = 'price'
            delete searchParams['order']
        }
        navigate({
            pathname: path.HOME,
            search: createSearchParams(searchParams).toString()
        })
    }

    return (
        <div className='flex justify-between items-center bg-gray-300/50 px-4 py-3 rounded text-sm'>
            {/* List button sort */}
            <div className='flex items-center gap-x-3'>
                <span className='text-gray-600 text-base'>{t('sort.sortby')}</span>
                {buttonSortList.map((item) => (
                    <button
                        key={item}
                        onClick={() => handleClickSort(item)}
                        className={cx(
                            'px-4 py-2 rounded capitalize',
                            isActiveSort(item) ? 'bg-primary text-white' : 'bg-white'
                        )}
                    >
                        {t(`sort.${item}` as any)}
                    </button>
                ))}
                <button
                    onMouseEnter={() => setShowPrice(true)}
                    onMouseLeave={() => setShowPrice(false)}
                    className={cx(
                        'inline-flex relative items-center bg-white hover:bg-gray-50 px-4 py-2 rounded focus:outline-none w-44 text-center',
                        queryConfig.sort_by === SortByEnum.PRICE && 'text-primary'
                    )}
                    type='button'
                >
                    {queryConfig?.sort_by === SortByEnum.PRICE
                        ? queryConfig.order === OrderEnum.ASC
                            ? t('sort.low_to_high')
                            : t('sort.high_to_low')
                        : t('sort.price')}
                    <svg
                        className='ms-auto w-2.5 h-2.5'
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
                    {/* Show dropdown option */}
                    {isShowPrice && (
                        <div className='top-full left-1/2 z-10 absolute bg-white shadow-sm rounded-sm divide-y divide-gray-100 w-44 -translate-x-1/2'>
                            <ul className='text-sm'>
                                <li
                                    onClick={() => handleClickSort('price', OrderEnum.ASC)}
                                    className={cx(
                                        'block hover:bg-gray-50 py-2 pl-4 text-left',
                                        queryConfig.order === OrderEnum.ASC ? 'text-primary' : 'text-black'
                                    )}
                                >
                                    {t('sort.low_to_high')}
                                </li>
                                <li
                                    onClick={() => handleClickSort('price', OrderEnum.DESC)}
                                    className={cx(
                                        'block hover:bg-gray-50 py-2 pl-4 text-left',
                                        queryConfig.order === OrderEnum.DESC ? 'text-primary' : 'text-black'
                                    )}
                                >
                                    {t('sort.high_to_low')}
                                </li>
                            </ul>
                        </div>
                    )}
                </button>
            </div>
            {/* Mini pagination */}
            <div className='flex items-center gap-x-5'>
                <p className='text-base tracking-widest'>
                    <span className='text-primary'>{page}</span>/{totalPage}
                </p>
                <div className='flex gap-x-[1px]'>
                    <PrevNextLink type='prev' queryConfig={queryConfig} totalPage={totalPage} />
                    <PrevNextLink type='next' queryConfig={queryConfig} totalPage={totalPage} />
                </div>
            </div>
        </div>
    )
}

export default Sort
