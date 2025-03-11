import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import path from '~/constant/path'
import authUtil from './authUtil'

class Axios {
    instance: AxiosInstance
    private accessToken: string

    constructor() {
        // Init value
        this.instance = axios.create({
            baseURL: 'https://api-ecom.duthanhduoc.com',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.accessToken = authUtil.getAccessToken()

        // Handle interceptors for request
        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken) {
                    config.headers.authorization = this.accessToken
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        // Handle interceptors for response
        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config
                if (url === path.LOGIN){
                    const resData = (response.data as AuthRes).data
                    console.log(resData);
                    this.accessToken = resData.access_token
                    authUtil.persistAccessToken(this.accessToken)
                    authUtil.persistProfile(resData.user)
                }
                if (url === path.LOGOUT) {
                    this.accessToken = ''
                    authUtil.clearPersistedData()
                }
                return response
            },
            function (error: AxiosError) {
                if (error.response?.status !== HttpStatusCode.UnprocessableEntity){
                    const data: any | undefined = error.response?.data
                    const message = data.message || error.message
                    toast.error(message)
                }
                return Promise.reject(error)
            }
        )
    }
}

const axiosConfig = new Axios().instance

export default axiosConfig
