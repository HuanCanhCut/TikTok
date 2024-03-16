import * as request from '~/utils/httpRequest'
import { showErrorToast } from './showToast'
import { AxiosProgressEvent } from 'axios'

interface GetVideo {
    type: string
    page: number
    accessToken: string
}

interface LikeVideo {
    videoID: number
    accessToken: string
}

interface UploadVideo {
    formData: FormData
    accessToken: string
    onUploadProgress: (progress: AxiosProgressEvent) => void
    onSuccess: () => void
    onError: () => void
}

export const getVideo = async ({ type = 'for-you', page, accessToken = '' }: GetVideo) => {
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
    } catch (error: any) {
        console.log(error)
        showErrorToast(error.message)
    }
}

export const likeVideo = async ({ videoID, accessToken = '' }: LikeVideo) => {
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

export const unLikeVideo = async ({ videoID, accessToken = '' }: LikeVideo) => {
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

export const uploadVideo = async ({
    formData,
    accessToken = '',
    onUploadProgress,
    onSuccess,
    onError,
}: UploadVideo) => {
    try {
        const response = await request.post('videos', formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            onUploadProgress,
        })

        if (response) {
            onSuccess()
        }
        return response
    } catch (error) {
        console.log(error)
        onError()
    }
}