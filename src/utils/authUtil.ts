const ACCESS_TOKEN: string = 'prv_token'
const PROFILE: string = 'profile'

export const CLEAR_TOKEN = 'CLEAR_TOKEN'

export const localStorageEvent = new EventTarget()

const persistAccessToken = (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN, token)
}

const clearPersistedData = (): void => {
    localStorage.removeItem(ACCESS_TOKEN)
    const clearTokenEvent = new Event(CLEAR_TOKEN)
    localStorageEvent.dispatchEvent(clearTokenEvent)
}

const getAccessToken = (): string => {
    return localStorage.getItem(ACCESS_TOKEN) ?? ''
}

const getProfile = (): User | null => {
    const profileLS = localStorage.getItem(PROFILE)
    return profileLS ? JSON.parse(profileLS) : null
}

const persistProfile = (profile: User): void => {
    localStorage.setItem(PROFILE, JSON.stringify(profile))
}

export default { persistAccessToken, clearPersistedData, getAccessToken, getProfile, persistProfile }
