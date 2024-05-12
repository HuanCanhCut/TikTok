import axios from 'axios'

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

export const get = async (path: string, options = {}) => {
    const response = await request.get(path, options)
    return response.data
}

export const post = async (path: string, data: any, options = {}) => {
    const response = await request.post(path, data, options)
    return response.data
}

export const deleteMethod = async (path: string, options = {}) => {
    const response = await request.delete(path, options)
    return response
}

export default request
