interface SuccessReponse<Data> {
    message: string
    data: Data
}

interface ErrorResponse<Data> {
    message: string
    data?: Data
}
