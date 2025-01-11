import axios, { AxiosError } from 'axios'

function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error)
}

function isAxiosUnprocessaleEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === 422
}

export { isAxiosError, isAxiosUnprocessaleEntityError }
