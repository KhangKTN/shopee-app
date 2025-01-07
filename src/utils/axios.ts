import axios, { type AxiosInstance } from 'axios'

class Axios {
    instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: 'https://api-ecom.duthanhduoc.com',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

const axiosConfig = new Axios().instance

export default axiosConfig
