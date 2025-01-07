import axiosConfig from "~/utils/axios";

const registerAccount = (body: { email: string; password: string }) => axiosConfig.post<AuthRes>('/register', body)

export {
    registerAccount
}