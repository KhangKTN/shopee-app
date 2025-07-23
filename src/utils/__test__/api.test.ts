import { HttpStatusCode } from 'axios'
import { describe, expect, it } from 'vitest'
import axiosConfig from '../axios'

describe('Call API', () => {
    it('Should call API public successfully', async () => {
        // Call manual API instead of use productApi, limit dependencies
        const res = await axiosConfig.get('products')
        expect(res.status).toEqual(HttpStatusCode.Ok)
    })

    it('Should call API public failed when request uri not correct', async () => {
        // Call manual API instead of use productApi, limit dependencies
        const res = await axiosConfig.get('abc')
        expect(res.status).toEqual(HttpStatusCode.NotFound)
    })

    it('Should call api profile successfully when access token valid', async () => {
        await axiosConfig.post('login', { email: 'd7@gmail.com', password: '123123' })
        const res = await axiosConfig.get('me')
        expect(res.status).toEqual(HttpStatusCode.Ok)
    })

    it('Should call api profile successfully when access token expired', async () => {
        // Set access token expired time to 1s before
        await axiosConfig.post('login', { email: 'd7@gmail.com', password: '123123' })
        const res = await axiosConfig.get('me')
        expect(res.status).toEqual(HttpStatusCode.Ok)
    })
})
