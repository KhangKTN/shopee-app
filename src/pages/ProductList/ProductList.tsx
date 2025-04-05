import { keepPreviousData, useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { useEffect } from 'react'
import categoryApi from '~/apis/category.api'
import productApi from '~/apis/product.api'
import Pagination from '~/components/Pagination'
import useQueryParam from '~/hooks/useQueryParam'
import { Filter, Product, Sort } from './index'

export type QueryConfig = {
    [key in keyof ProductQuery]?: string
}

const ProductList = () => {
    const queryParam: QueryConfig = useQueryParam()
    const queryConfig: QueryConfig = _.omitBy(
        {
            page: queryParam.page ?? '1',
            limit: queryParam.limit,
            name: queryParam.name,
            sort_by: queryParam.sort_by,
            order: queryParam.order,
            price_min: queryParam.price_min,
            price_max: queryParam.price_max,
            exclude: queryParam.exclude,
            category: queryParam.category,
            rating_filter: queryParam.rating_filter
        },
        _.isUndefined
    )

    const { data: productData, isSuccess } = useQuery({
        queryKey: ['products', queryParam],
        queryFn: () => productApi.getProductList(queryConfig as ProductQuery),
        placeholderData: keepPreviousData
    })

    const totalPage = productData?.data.data.pagination.page_size

    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getCategories()
    })

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [queryParam])

    return (
        <section className='bg-gray-200 px-16 py-4'>
            <div className='container'>
                <div className='gap-5 grid grid-cols-12'>
                    <div className='col-span-3'>
                        <Filter categories={categoriesData?.data.data ?? []} queryConfig={queryConfig} />
                    </div>
                    <div className='col-span-9'>
                        <Sort queryConfig={queryConfig} totalPage={totalPage} />
                        {isSuccess && (
                            <div className='gap-x-3 gap-y-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5'>
                                {productData?.data.data.products.map((product) => (
                                    <Product key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                        <Pagination queryConfig={queryConfig} totalPage={totalPage} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductList
