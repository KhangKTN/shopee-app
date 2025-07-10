type AuthRes = SuccessReponse<{
    access_token: string
    expries: number
    refresh_token: string
    expires_refresh_token: number
    user: User
}>

type RefreshTokenRes = SuccessReponse<{
    access_token: string
}>
