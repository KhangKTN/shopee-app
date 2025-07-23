import { AxiosError, HttpStatusCode } from 'axios'
import { describe, expect, it } from 'vitest'
import { isAxiosError, isAxiosUnprocessaleEntityError } from '../helper'

/**
 * Describes a set of scenarios or a unit to be tested (function, component)
 */
describe('isAxiosError', () => {
    it('should return false for non-Axios error', () => {
        const error = new Error('Generic error')
        expect(isAxiosError(error)).toBe(false)
    })

    it('should return true for AxiosError', () => {
        const axiosError = new AxiosError('Axios error')
        expect(isAxiosError(axiosError)).toBe(true)
    })
})

describe('isAxiosUnprocessaleEntityError', () => {
    it('should return false for non-Axios error', () => {
        const error = new Error('Generic error')
        expect(isAxiosUnprocessaleEntityError(error)).toBe(false)
    })

    it('should return false for AxiosError with non-422 status code', () => {
        const axiosError = new AxiosError('Server error', undefined, undefined, undefined, {
            status: HttpStatusCode.InternalServerError
        } as any)
        expect(isAxiosUnprocessaleEntityError(axiosError)).toBe(false)
    })

    it('should return true for AxiosError with 422 status code', () => {
        const axiosError = new AxiosError('Unprocessable Entity', undefined, undefined, undefined, {
            status: HttpStatusCode.UnprocessableEntity
        } as any)
        expect(isAxiosUnprocessaleEntityError(axiosError)).toBe(true)
    })
})
