import _ from 'lodash'
import { QueryConfig } from '~/pages/ProductList/ProductList'
import useQueryParam from './useQueryParam'

const useQueryConfig = () => {
    const queryParam: QueryConfig = useQueryParam()
    return _.omitBy(
        {
            page: queryParam.page ?? '1',
            limit: queryParam.limit ?? '16',
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
}

export default useQueryConfig
