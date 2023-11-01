import * as request from '~/utils/httpRequest'

export const getSuggested = async function (page, perPage) {
    try {
        const result = await request.get(`users/suggested?`, {
            params: {
                page,
                per_page: perPage,
            },
        })
        return result
    } catch (error) {
        console.log(error)
    }
}
