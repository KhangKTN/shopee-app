import axiosConfig from '~/utils/axios'

const URL = 'purchases'

const addToCart = (data: { product_id: string; buy_count: number }) => {
    return axiosConfig.post<SuccessReponse<Purchase>>(`${URL}/add-to-cart`, data)
}

const getListPurchase = (status: PurchaseListStatus) => {
    return axiosConfig.get<SuccessReponse<Purchase[]>>(`${URL}`, { params: { status } })
}

const buyProducts = (data: { product_id: string; buy_count: number }[]) => {
    return axiosConfig.post<SuccessReponse<Purchase[]>>(`${URL}/buy-products`, data)
}

const updatePurchase = (data: { product_id: string; buy_count: number }) => {
    return axiosConfig.put<SuccessReponse<Purchase>>(`${URL}/update-purchase`, data)
}

const deletePurchase = (purchaseIds: string[]) => {
    return axiosConfig.delete<SuccessReponse<{ deleted_count: number }>>(`${URL}`, { data: purchaseIds })
}

export default { addToCart, getListPurchase, buyProducts, updatePurchase, deletePurchase }
