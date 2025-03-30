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
                className ? className : 'flex justify-center items-center hover:bg-gray-50 rounded-s-sm size-8',
                disablePage ? 'text-gray-400 bg-white/50 pointer-events-none' : 'text-gray-600 bg-white'
            )}
        >
            <i className={cx('fa-solid', type === 'prev' ? 'fa-angle-left' : 'fa-angle-right')}></i>
        </Link>
    )
}

export default PrevNextLink
