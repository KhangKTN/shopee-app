import axiosConfig from '~/configs/axios.config'

const URL = 'categories'

const getCategories = () => {
    return axiosConfig.get<SuccessReponse<Category[]>>(URL)
}

export default { getCategories }
