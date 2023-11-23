import * as request from '~/utils/httpRequest'

export const getSuggested = async (page, perPage) => {
    try {
        return await request.get(`users/suggested?`, {
            params: {
                page,
                per_page: perPage,
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export const getFollowingAccounts = async (page, accessToken) => {
    try {
        return await request.get(`me/followings?`, {
            params: {
                page,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    } catch (error) {
        console.log(error)
    }
}
export const getAnUser = async ({ nickname, accessToken = '' }) => {
    try {
        return await request.get(`users/@${nickname}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    } catch (error) {
        console.log(error)
    }
}

export const followAnUser = async ({ userId, accessToken }) => {
    try {
        return await request.post(`users/${userId}/follow`, [], {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    } catch (error) {
        console.log(error)
    }
}

export const unFollowUser = async ({ userId, accessToken }) => {
    try {
        return await request.post(`users/${userId}/unfollow`, [], {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    } catch (error) {
        console.log(error)
    }
}
