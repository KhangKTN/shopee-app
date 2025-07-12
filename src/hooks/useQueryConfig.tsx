import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { QueryConfig } from '~/pages/ProductList/ProductList'
import useQueryParam from './useQueryParam'

const useQueryConfig = () => {
    const queryParam: QueryConfig = useQueryParam()

    return omitBy(
        {
            page: queryParam.page,
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
        isUndefined
    )
}

export default useQueryConfig
