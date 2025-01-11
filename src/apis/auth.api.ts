import axiosConfig from '~/utils/axios'
import { LoginSchema } from '~/utils/validateField'

const registerAccount = (body: { email: string, password: string }) => axiosConfig.post<AuthRes>('/register', body)

const loginAccount = (body: LoginSchema) => axiosConfig.post<AuthRes>('/login', body)

export { registerAccount, loginAccount }
