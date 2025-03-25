import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import productApi from '~/apis/product.api'
import Pagination from '~/components/Pagination'
import useQueryParam from '~/hooks/useQueryParam'
import { Filter, Product, Sort } from './index'

const ProductList = () => {
    const queryParam = useQueryParam()
    const [page, setPage] = useState<number>(5)

    const { data } = useQuery({
        queryKey: ['products', queryParam],
        queryFn: () => productApi.getProductList(queryParam)
    })

    return (
        <div className='bg-gray-200 px-16 py-4'>
            <div className='container'>
                <div className='grid grid-cols-12 gap-5'>
                    <div className='col-span-3'>
                        <Filter />
                    </div>
                    <div className='col-span-9'>
                        <>
                            <Sort />
                            <div className='mt-5 grid gap-x-3 gap-y-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                {data?.data.data.products.map((product) => (
                                    <Product key={product._id} product={product} />
                                ))}
                            </div>
                        </>
                        <Pagination
                            page={page}
                            setPage={setPage}
                            totalPage={data?.data.data.pagination.page_size || 1}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
