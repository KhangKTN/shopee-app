import axiosConfig from '~/utils/axios'

const URL = 'purchases'

const addToCart = (data: { product_id: string; buy_count: number }) => {
    return axiosConfig.post<SuccessReponse<Purchase>>(`${URL}/add-to-cart`, data)
}

const getListPurchase = (status: PurchaseListStatus) => {
    return axiosConfig.get<SuccessReponse<Purchase[]>>(`${URL}`, { params: { status } })
}

export default { addToCart, getListPurchase }
