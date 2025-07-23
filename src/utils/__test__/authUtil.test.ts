import { beforeEach, describe, expect, it } from 'vitest'
import authUtil from '../authUtil'

describe('authUtil', () => {
    const accessToken = 'test-access-token'
    const refreshToken = 'test-refresh-token'
    const profile = { name: 'KhangKTN', email: 'khangktn@gmail.com' }

    beforeEach(() => {
        localStorage.clear()
    })

    describe('persistData', () => {
        it('should store access token in local storage', () => {
            authUtil.persistAccessToken(accessToken)
            expect(authUtil.getAccessToken()).toEqual(accessToken)
        })

        it('should store refresh token in local storage', () => {
            authUtil.persistRefreshToken(refreshToken)
            expect(authUtil.getRefreshToken()).toEqual(refreshToken)
        })

        it('should store profile data in local storage', () => {
            authUtil.persistProfile(profile as any)
            expect(authUtil.getProfile()).toEqual(profile)
        })
    })

    describe('clearPersistedData', () => {
        beforeEach(() => {
            localStorage.setItem('access_token', accessToken)
            localStorage.setItem('refresh_token', refreshToken)
            localStorage.setItem('profile', JSON.stringify(profile))
        })

        it('should clear access token, refresh token, and profile from local storage', () => {
            authUtil.clearPersistedData()

            expect(authUtil.getAccessToken()).toBe('')
            expect(authUtil.getRefreshToken()).toBe('')
            expect(authUtil.getProfile()).toBeNull()
        })
    })
})
