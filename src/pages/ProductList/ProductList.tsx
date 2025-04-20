import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import categoryApi from '~/apis/category.api'
import productApi from '~/apis/product.api'
import { ProductLoading } from '~/components/Loading'
import Pagination from '~/components/Pagination'
import useQueryConfig from '~/hooks/useQueryConfig'
import { Filter, Product, Sort } from './index'

export type QueryConfig = {
    [key in keyof ProductQuery]?: string
}

const ProductList = () => {
    const queryConfig: QueryConfig = useQueryConfig()

    const { data: productData, isPending } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return productApi.getProductList(queryConfig as ProductQuery)
        }
    })

    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return categoryApi.getCategories()
        }
    })

    const totalPage = productData?.data.data.pagination.page_size
    const foundProduct = (productData?.data.data.products.length ?? 0) > 0

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [queryConfig.page])

    return (
        <section className='bg-gray-200 px-16 py-4'>
            <div className='container'>
                <div className='gap-5 grid grid-cols-12'>
                    <div className='col-span-3'>
                        <Filter categories={categoriesData?.data.data ?? []} queryConfig={queryConfig} />
                    </div>
                    <div className='col-span-9'>
                        <Sort queryConfig={queryConfig} totalPage={totalPage} />
                        <div className='gap-x-3 gap-y-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5'>
                            {isPending ? (
                                <ProductLoading />
                            ) : foundProduct ? (
                                productData?.data.data.products.map((product) => (
                                    <Product key={product._id} product={product} />
                                ))
                            ) : (
                                <div className='bg-gray-300/50 mt-5 py-4 rounded text-primary text-center italic'>
                                    Không tìm thấy sản phẩm nào phù hợp
                                </div>
                            )}
                        </div>
                        {foundProduct && <Pagination queryConfig={queryConfig} totalPage={totalPage} />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductList
