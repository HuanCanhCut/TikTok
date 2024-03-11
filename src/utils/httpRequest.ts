import axios from 'axios'

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API_PATH,
})

export const get = async (path: string, options = {}) => {
    const response = await request.get(path, options)
    return response.data
}

export const post = async (path: string, data: any, options = {}) => {
    const response = await request.post(path, data, options)
    return response.data
}

export default request
