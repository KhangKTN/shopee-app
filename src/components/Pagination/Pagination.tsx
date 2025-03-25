import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface Prop {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    totalPage: number
}

// Define number of page can display compared to current page
const PAGE_RANGE = 2

const Pagination = ({ page, setPage, totalPage }: Prop) => {
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
                <button key={idx} className='bg-white rounded px-3 py-2 shadow-sm cursor-default'>
                    ...
                </button>
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
                if (
                    page >= totalPage - PAGE_RANGE * 2 &&
                    pageNumber > PAGE_RANGE &&
                    pageNumber < page - PAGE_RANGE
                ) {
                    return renderDot(idx, 'before')
                }

                return (
                    <button
                        onClick={() => setPage(pageNumber)}
                        key={idx}
                        className={classNames('rounded px-3.5 py-2 shadow-sm', {
                            'bg-primary text-white': pageNumber === page,
                            'bg-white': pageNumber !== page
                        })}
                    >
                        {pageNumber}
                    </button>
                )
            })
    }

    return (
        <div className='flex gap-x-2 flex-wrap mt-6 justify-center'>
            <Link to={'/'} className='bg-white rounded px-3 py-2 shadow-sm'>
                {'<'}
            </Link>
            {renderPage()}
            <Link to={'/'} className='bg-white rounded px-3 py-2 shadow-sm'>
                {'>'}
            </Link>
        </div>
    )
}

export default Pagination
