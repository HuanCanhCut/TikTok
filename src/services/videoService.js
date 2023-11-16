import * as request from '~/utils/httpRequest'

export const getVideo = async ({ type = 'for-you', page, accessToken = '' }) => {
    try {
        return await request.get('videos', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                type,
                page,
            },
        })
    } catch (error) {
        console.log(error)
    }
}
