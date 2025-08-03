import axios, { AxiosError, HttpStatusCode } from 'axios'

function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error)
}

function isAxiosUnprocessaleEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === 422
}

function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
    return (
        isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
        error.response?.data?.data?.name === 'EXPIRED_TOKEN'
    )
}

/**
 * Check error for case: Unauthorized or UnprocessableEntity
 * This error can show message to client
 */
const isNormalError = (error: AxiosError): boolean => {
    return ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
}

export {
    isAxiosError,
    isAxiosExpiredTokenError,
    isAxiosUnauthorizedError,
    isAxiosUnprocessaleEntityError,
    isNormalError
}
