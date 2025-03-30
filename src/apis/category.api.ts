import axiosConfig from '~/utils/axios'

const URL = 'categories'

const getCategories = () => {
    return axiosConfig.get<SuccessReponse<Category[]>>(URL)
}

export default { getCategories }
