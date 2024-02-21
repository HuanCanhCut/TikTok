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

export const likeVideo = async ({ videoID, accessToken = '' }) => {
    try {
        return await request.post(`videos/${videoID}/like`, [], {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export const unLikeVideo = async ({ videoID, accessToken = '' }) => {
    try {
        return await request.post(`videos/${videoID}/unlike`, [], {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export const uploadVideo = async ({ formData, accessToken = '', onUploadProgress }) => {
    try {
        return await request.post('videos', formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            onUploadProgress,
        })
    } catch (error) {
        console.log(error)
    }
}
