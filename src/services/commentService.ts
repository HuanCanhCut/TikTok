import * as request from '~/utils/httpRequest'

export const getComments = async ({
    videoID,
    accessToken,
    page,
}: {
    videoID: number
    accessToken: string
    page: number
}) => {
    try {
        return await request.get(`videos/${videoID}/comments`, {
            params: { page: page },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export const postComment = async ({
    videoUuid,
    content,
    accessToken,
}: {
    videoUuid: string
    content: string
    accessToken: string
}) => {
    try {
        return await request.post(
            `videos/${videoUuid}/comments`,
            {
                comment: content,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = async ({ commentID, accessToken }: { commentID: number; accessToken: string }) => {
    try {
        return await request.deleteMethod(`comments/${commentID}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export const likeComment = async ({ commentID, accessToken }: { commentID: number; accessToken: string }) => {
    try {
        return await request.post(`comments/${commentID}/like`, [], {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export const unLikeComment = async ({ commentID, accessToken }: { commentID: number; accessToken: string }) => {
    try {
        return await request.post(`comments/${commentID}/unlike`, [], {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    } catch (error) {
        console.log(error)
    }
}
