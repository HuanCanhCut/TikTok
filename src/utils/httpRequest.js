import axios from 'axios'

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API_PATH,
})

export const get = async (path, options = {}) => {
    const response = await request.get(path, options)
    return response.data
}

export const post = async (path, data, options = {}) => {
    const response = await request.post(path, data, options)
    return response.data
}

export default request
