import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import path from '~/constants/path.constant'
import authUtil from '~/utils/auth.util'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError, isNormalError } from '~/utils/axios.util'

const URL_REFRESH_TOKEN = 'refresh-access-token'
const DAY_IN_MILISECOND = 24 * 60 * 60

class Axios {
    instance: AxiosInstance
    private accessToken: string
    private refreshToken: string
    private refreshTokenRequest: Promise<string> | null

    constructor() {
        // Init value
        this.instance = axios.create({
            baseURL: 'https://api-ecom.duthanhduoc.com',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'expire-access-token': 3 * DAY_IN_MILISECOND,
                'expire-refresh-token': 30 * DAY_IN_MILISECOND
            }
        })
        this.accessToken = authUtil.getAccessToken()
        this.refreshToken = authUtil.getRefreshToken()
        this.refreshTokenRequest = null

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
                if (url === path.LOGIN) {
                    const resData = (response.data as AuthRes).data
                    this.accessToken = resData.access_token
                    this.refreshToken = resData.refresh_token
                    authUtil.persistAccessToken(this.accessToken)
                    authUtil.persistRefreshToken(this.refreshToken)
                    authUtil.persistProfile(resData.user)
                }
                if (url === path.LOGOUT) {
                    this.accessToken = ''
                    authUtil.clearPersistedData()
                }
                return response
            },
            (error: AxiosError) => {
                if (isNormalError(error)) {
                    const message = (error.response?.data as any)?.message || error.message
                    toast.error(message)
                }

                if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
                    // If user not login
                    if (!this.accessToken) {
                        Swal.fire('Chưa đăng nhập', 'Vui lòng đăng nhập để tiếp tục!', 'error')
                        return
                    }

                    const currentRequest = error.response?.config || { headers: {}, url: '' }
                    const { url } = currentRequest

                    // Call api with expired token (Not refresh token)
                    if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
                        // Cache refreshTokenRequest avoid multi request
                        this.refreshTokenRequest = this.refreshTokenRequest
                            ? this.refreshTokenRequest
                            : this.handleRefreshToken().finally(() => {
                                  // Keep refreshTokenRequest in 10s for request 401
                                  setTimeout(() => {
                                      this.refreshTokenRequest = null
                                  }, 10000)
                              })

                        return this.refreshTokenRequest.then((access_token) => {
                            return this.instance({
                                ...currentRequest,
                                headers: { ...currentRequest.headers, authorization: access_token }
                            })
                        })
                    }

                    authUtil.clearPersistedData()
                    this.accessToken = ''
                    this.refreshToken = ''
                    toast.error(error.response?.data.data?.message || error.response?.data.message)
                }

                return Promise.reject(error)
            }
        )
    }

    private async handleRefreshToken(): Promise<string> {
        try {
            const response = await this.instance.post<RefreshTokenRes>(URL_REFRESH_TOKEN, {
                refresh_token: this.refreshToken
            })

            const accessToken = response.data.data.access_token
            authUtil.persistAccessToken(accessToken)
            this.accessToken = accessToken

            return accessToken
        } catch (error) {
            authUtil.clearPersistedData()
            this.accessToken = ''
            this.refreshToken = ''
            throw error
        }
    }
}

const axiosConfig = new Axios().instance
export default axiosConfig
