import { useQuery } from '@tanstack/react-query'
import productApi from '~/apis/product.api'
import useQueryParam from '~/hooks/useQueryParam'
import Filter from './Filter/Filter'
import Product from './Product/Product'
import Sort from './Sort/Sort'

const ProductList = () => {
    const queryParam = useQueryParam()

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
                        <div>
                            <Sort />
                            <div className='mt-5 grid gap-x-3 gap-y-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                {data?.data.data.products.map((product) => (
                                    <Product key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
