import { FormEvent, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from '~/constant/path'
import useQueryConfig from '~/hooks/useQueryConfig'
import { QueryConfig } from '~/pages/ProductList/ProductList'

const CartSearch = () => {
    const queryConfig: QueryConfig = useQueryConfig()
    const [search, setSearch] = useState(queryConfig.name ?? '')
    const navigate = useNavigate()

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const searchValue = search.trim()
        if (searchValue === '') {
            return
        }
        const queryObj = { ...queryConfig, page: '1', name: searchValue }
        navigate({
            pathname: path.HOME,
            search: createSearchParams(queryObj).toString()
        })
    }

    return (
        <form onSubmit={handleSearch} className='flex rounded w-1/2 overflow-hidden'>
            <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className='flex-grow px-2 py-2 border-gray-400 border-y-2 focus:border-primary border-l-2 outline-none transition-colors'
                type='text'
                placeholder='Phí ship 0Đ'
            />
            <button className='bg-primary hover:opacity-90 px-8 py-2 text-white transition-opacity'>
                <i className='fa-solid fa-magnifying-glass'></i>
            </button>
        </form>
    )
}

export default CartSearch
