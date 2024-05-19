import * as request from '~/utils/httpRequest'

export const getComments = async ({ videoID, accessToken }: { videoID: number; accessToken: string }) => {
    try {
        return await request.get(`videos/${videoID}/comments`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export const createComment = async ({
    videoUuid,
    content,
    accessToken,
}: {
    videoUuid: number
    content: string
    accessToken: string
}) => {
    try {
        return await request.post(
            `videos/${videoUuid}/comments`,
            {
                content,
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
