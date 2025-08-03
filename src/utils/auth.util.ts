const ACCESS_TOKEN: string = 'prv_token'
const REFRESH_TOKEN: string = 'ref_token'
const PROFILE: string = 'profile'

export const CLEAR_TOKEN = 'CLEAR_TOKEN'

export const localStorageEvent = new EventTarget()

// Access token
const persistAccessToken = (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN, token)
}

const clearPersistedData = (): void => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(PROFILE)

    const clearTokenEvent = new Event(CLEAR_TOKEN)
    localStorageEvent.dispatchEvent(clearTokenEvent)
}

const getAccessToken = (): string => {
    return localStorage.getItem(ACCESS_TOKEN) ?? ''
}

// Profile
const getProfile = (): User | null => {
    const profileLS = localStorage.getItem(PROFILE)
    return profileLS ? JSON.parse(profileLS) : null
}

const persistProfile = (profile: User): void => {
    localStorage.setItem(PROFILE, JSON.stringify(profile))
}

// Refresh token
const persistRefreshToken = (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN, token)
}

const getRefreshToken = (): string => {
    return localStorage.getItem(REFRESH_TOKEN) ?? ''
}

export default {
    persistAccessToken,
    clearPersistedData,
    getAccessToken,
    getProfile,
    persistProfile,
    persistRefreshToken,
    getRefreshToken
}
