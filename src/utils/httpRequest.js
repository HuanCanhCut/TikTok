import axios from 'axios'

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
})

export const get = async (path, options) => {
    const reponse = await request.get(path, options) // call api
    return reponse.data
}

export default request
