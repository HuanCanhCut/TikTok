import axios from 'axios'

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
})

export const get = async (path, options = {}) => {
    const response = await request.get(path, options) // call api
    return response.data
}

export const post = async (path, data, options = {}) => {
    const response = await request.post(path, data, options)
    return response.data
}

export default request
