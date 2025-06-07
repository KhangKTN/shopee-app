import cx from 'classix'
import { createSearchParams, Link } from 'react-router-dom'
import path from '~/constant/path'
import { QueryConfig } from '~/pages/ProductList/ProductList'

interface Prop {
    type: 'prev' | 'next'
    queryConfig: QueryConfig
    totalPage: number
    className?: string
}

const PrevNextLink = ({ type, queryConfig, totalPage, className }: Prop) => {
    const page = Number(queryConfig.page)
    const linkPage = type === 'prev' ? page - 1 : page + 1
    const url = {
        pathname: path.HOME,
        search: createSearchParams({ ...queryConfig, page: String(linkPage) }).toString()
    }

    let disablePage = false
    if (type === 'prev' && page === 1) {
        disablePage = true
    }
    if (type === 'next' && page === totalPage) {
        disablePage = true
    }

    return (
        <Link
            to={url}
            className={cx(
                className ? className : 'flex justify-center items-center size-10 shadow-sm',
                disablePage
                    ? 'text-gray-400 bg-gray-50/80 cursor-not-allowed'
                    : 'text-gray-600 bg-white hover:bg-gray-50 hover:text-primary',
                type === 'prev' ? 'rounded-s' : 'rounded-e'
            )}
        >
            <i className={cx('fa-solid', type === 'prev' ? 'fa-angle-left' : 'fa-angle-right')}></i>
        </Link>
    )
}

export default PrevNextLink
