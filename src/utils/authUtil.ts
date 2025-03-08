const ACCESS_TOKEN: string = 'accessToken'

const persistAccessToken = (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN, token)
}

const clearAccessToken = (): void => {
    localStorage.removeItem(ACCESS_TOKEN)
}

const getAccessToken = (): string => {
    return localStorage.getItem(ACCESS_TOKEN) ?? ''
}

export default { persistAccessToken, clearAccessToken, getAccessToken }
