import * as request from '~/utils/httpRequest'

export const search = async function (q: string, type = 'less') {
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
