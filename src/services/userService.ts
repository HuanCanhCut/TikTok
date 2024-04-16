import * as request from '~/utils/httpRequest'

interface AccessToken {
    accessToken: string
}

interface GetSuggestedAccounts extends AccessToken {
    page: number
    perPage: number
}

interface GetFollowingAccounts extends AccessToken {
    page: number
}

interface FollowAnUser extends AccessToken {
    userId: number
}

export const getSuggestedAccounts = async ({ page, perPage, accessToken }: GetSuggestedAccounts) => {
    try {
        return await request.get(`users/suggested?`, {
            params: {
                page,
                per_page: perPage,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    } catch (error) {
        console.log(error)
    }
}

export const getFollowingAccounts = async ({ page, accessToken }: GetFollowingAccounts) => {
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

export const getAnUser = async ({ nickname, accessToken = '' }: { nickname: string; accessToken: string }) => {
    try {
        return await request.get(`users/${nickname}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export const followAnUser = async ({ userId, accessToken }: FollowAnUser) => {
    try {
        return await request.post(`users/${userId}/follow`, [], {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    } catch (error) {
        console.log(error)
    }
}

export const unFollowUser = async ({ userId, accessToken }: FollowAnUser) => {
    try {
        return await request.post(`users/${userId}/unfollow`, [], {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    } catch (error) {
        console.log(error)
    }
}
