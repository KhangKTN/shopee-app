import { useQuery } from '@tanstack/react-query'
import { memo, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import productApi from '~/apis/product.api'
import { Product } from '~/pages/ProductList'
import { ProductLoading } from '../Loading'

interface Prop {
    id: string
    category: string
}

const MINUTE_IN_MILISECOND = 60 * 1000

const RelatedProduct = ({ id, category }: Prop) => {
    const { t } = useTranslation('product')
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setVisible] = useState(false)

    const queryConfig: ProductQuery = { page: '1', limit: 12, category, exclude: id }

    const { data: productRelateds, isFetching: isFetchingRelatedProduct } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return productApi.getProductList(queryConfig)
        },
        staleTime: 5 * MINUTE_IN_MILISECOND, // Use cache data, avoid api callback
        gcTime: 5 * MINUTE_IN_MILISECOND,
        enabled: Boolean(id) && isVisible
    })

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect()
                if (rect.top <= window.innerHeight) {
                    setVisible(true)
                }
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div ref={ref} className='mx-auto container'>
            <h2 className='mt-8 font-medium text-gray-500 text-lg uppercase'>{t('may_also_like')}</h2>
            <div className='gap-x-3 gap-y-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-5'>
                {isFetchingRelatedProduct ? (
                    <ProductLoading />
                ) : (
                    productRelateds?.data.data.products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))
                )}
            </div>
        </div>
    )
}

export default memo(RelatedProduct)
