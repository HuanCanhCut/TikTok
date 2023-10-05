import * as request from '~/utils/httpRequest'

export const getSuggested = async function (page, perPage) {
    try {
        const result = await request.get(`users/suggested?`, {
            params: {
                page,
                per_page: perPage,
            },
        })
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const followAnUser = async ({ userID, accessToken }) => {
    try {
        return await request.post(`users/${userID}/follow`, [], {
            Headers: `Bearer ${accessToken}`,
        })
    } catch (error) {
        console.log(error)
    }
}
