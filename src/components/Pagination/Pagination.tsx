import cx from 'classix'
import { createSearchParams, Link } from 'react-router-dom'
import path from '~/constants/path.constant'
import { QueryConfig } from '~/pages/ProductList/ProductList'
import PrevNextLink from './PrevNextLink'

interface Prop {
    totalPage: number | undefined
    queryConfig: QueryConfig
}

// Define number of page can display compared to current page
const PAGE_RANGE = 2

const Pagination = ({ queryConfig, totalPage = 0 }: Prop) => {
    const page = Number(queryConfig.page ?? 1)

    const renderPage = () => {
        let isShowAfterDot = false
        let isShowBeforeDot = false

        const renderDot = (idx: number, type: 'before' | 'after') => {
            if (type === 'after') {
                if (isShowAfterDot) {
                    return
                }
                isShowAfterDot = true
            } else if (type === 'before') {
                if (isShowBeforeDot) {
                    return
                }
                isShowBeforeDot = true
            }
            return (
                <span
                    key={idx}
                    className='flex justify-center items-center bg-white shadow-sm rounded size-10 cursor-default'
                >
                    ...
                </span>
            )
        }

        return Array(totalPage)
            .fill(0)
            .map((_, idx) => {
                const pageNumber = idx + 1
                // Condition render dot after
                if (
                    page <= PAGE_RANGE * 2 + 1 &&
                    pageNumber > page + PAGE_RANGE &&
                    pageNumber < totalPage - PAGE_RANGE + 1
                ) {
                    return renderDot(idx, 'after')
                }
                // Condition render dot before and after
                if (page > PAGE_RANGE * 2 + 1 && page < totalPage - PAGE_RANGE * 2) {
                    if (pageNumber < page - PAGE_RANGE && pageNumber > PAGE_RANGE) {
                        return renderDot(idx, 'before')
                    }
                    if (pageNumber > page + PAGE_RANGE && pageNumber < totalPage - PAGE_RANGE + 1) {
                        return renderDot(idx, 'after')
                    }
                }
                // Condition render dot before
                if (page >= totalPage - PAGE_RANGE * 2 && pageNumber > PAGE_RANGE && pageNumber < page - PAGE_RANGE) {
                    return renderDot(idx, 'before')
                }

                return (
                    <Link
                        to={{
                            pathname: path.HOME,
                            search: createSearchParams({ ...queryConfig, page: String(pageNumber) }).toString()
                        }}
                        key={idx}
                        className={cx(
                            'flex justify-center items-center shadow-sm rounded size-10 font-medium',
                            pageNumber === page
                                ? 'bg-primary text-white'
                                : 'bg-white hover:bg-gray-50 hover:text-primary transition-colors'
                        )}
                    >
                        {pageNumber}
                    </Link>
                )
            })
    }

    return (
        <div className='flex flex-wrap justify-center gap-x-2 mt-6'>
            <PrevNextLink type='prev' queryConfig={queryConfig} totalPage={totalPage} />
            {renderPage()}
            <PrevNextLink type='next' queryConfig={queryConfig} totalPage={totalPage} />
        </div>
    )
}

export default Pagination
