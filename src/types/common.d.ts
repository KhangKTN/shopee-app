interface ErrorResponse<Data> {
    message: string,
    data?: Data
}

interface SuccessReponse<Data> {
    message: string,
    data: Data
}
