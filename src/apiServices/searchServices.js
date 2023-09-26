import * as request from '~/utils/request'

export const search = async function (q, type = 'less') {
    try {
        const result = await request.get(`users/search?`, {
            params: {
                q,
                type,
            },
        })
        return result.data
    } catch (error) {
        console.log(error)
    }
}
