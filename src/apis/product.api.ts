import axiosConfig from '~/utils/axios'

const URL = 'products'

const getProductList = (params: ProductQuery) => {
    return axiosConfig.get<SuccessReponse<ProductList>>(URL, { params })
}

const getProductDetail = (id: string) => axiosConfig.get<SuccessReponse<Product>>(`${URL}/${id}`)

export default { getProductList, getProductDetail }
