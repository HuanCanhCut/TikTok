import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as videoService from '~/services/videoService'
import { sendEvent } from '~/helpers/event'
import { UserModal, VideoModal } from '~/modal/modal'
import { actions } from '~/redux'
import { followAnUser, unFollowUser } from '~/services/userService'
import { Dispatch, UnknownAction } from 'redux'
import { SetStateAction } from 'react'

export const removeDuplicate = (duplicateStore: number[], duplicateValue: number) => {
    if (duplicateStore.includes(duplicateValue)) {
        for (var i = duplicateStore.length - 1; i >= 0; i--) {
            if (duplicateStore[i] === duplicateValue) {
                duplicateStore.splice(i, 1)
            }
        }
    }
    return duplicateStore
}

export const showToast = ({ message }: { message: string }) => {
    return toast.success(message, {
        className: 'custom-toast',
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    })
}

export const copyToClipboard = (value: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
}

export const handleFollowAnUser = async ({
    currentUser,
    isCallingApi,
    temporaryUnFollowedList,
    user,
    dispatch,
    setIsCallingApi,
    accessToken,
}: {
    currentUser: UserModal
    isCallingApi: boolean
    temporaryUnFollowedList: number[]
    user: UserModal
    dispatch: Dispatch<UnknownAction>
    setIsCallingApi: React.Dispatch<SetStateAction<boolean>>
    accessToken: string
}) => {
    if (!accessToken || !currentUser) {
        sendEvent({ eventName: 'auth:open-auth-modal', detail: true })
        return
    }
    if (isCallingApi) {
        return
    }

    // khi follow thì sẽ xóa id của người vừa được follow ra khỏi danh sách unFollowed temporary
    removeDuplicate(temporaryUnFollowedList, user.id)
    if (!temporaryUnFollowedList.includes(user.id)) {
        dispatch(actions.temporaryFollowed(user.id))
    }

    setIsCallingApi(true)

    try {
        return await followAnUser({
            userId: user.id,
            accessToken,
        })
    } catch (error) {
        console.log(error)
    } finally {
        setIsCallingApi(false)
    }
}

export const handleUnFollowAnUser = async ({
    currentUser,
    isCallingApi,
    temporaryFollowedList,
    user,
    dispatch,
    setIsCallingApi,
    accessToken,
}: {
    currentUser: UserModal
    isCallingApi: boolean
    temporaryFollowedList: number[]
    user: UserModal
    dispatch: Dispatch<UnknownAction>
    setIsCallingApi: any
    accessToken: string
}) => {
    if (!accessToken || !currentUser) {
        sendEvent({ eventName: 'auth:open-auth-modal', detail: true })
        return
    }

    if (isCallingApi) {
        return
    }

    // khi unFollow thì sẽ xóa id của người vừa được unFollow ra khỏi danh sách Followed temporary
    removeDuplicate(temporaryFollowedList, user.id)
    dispatch(actions.temporaryUnFollowed(user.id))

    setIsCallingApi(true)

    try {
        return await unFollowUser({
            userId: user.id,
            accessToken,
        })
    } catch (error) {
        console.log(error)
    } finally {
        setIsCallingApi(false)
    }
}

export const likeVideo = async ({
    dispatch,
    temporaryUnLikeList,
    video,
    id,
    accessToken,
    setIsCallingApi,
}: {
    dispatch: Dispatch<UnknownAction>
    temporaryUnLikeList: number[]
    video: VideoModal
    id: number
    accessToken: string
    setIsCallingApi?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    removeDuplicate(temporaryUnLikeList, id)
    if (id) {
        if (!temporaryUnLikeList.includes(id)) {
            dispatch(actions.temporaryLiked(id))
        }
    }

    try {
        return await videoService.likeVideo({
            videoID: id || video.id,
            accessToken,
        })
    } catch (error) {
        console.log(error)
    } finally {
        setIsCallingApi && setIsCallingApi(false)
    }
}

export const unLikeVideo = async ({
    dispatch,
    temporaryLikeList,
    video,
    id,
    accessToken,
    setIsCallingApi,
}: {
    dispatch: Dispatch<UnknownAction>
    temporaryLikeList: number[]
    video: VideoModal
    id: number
    accessToken: string
    setIsCallingApi?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    if (id) {
        removeDuplicate(temporaryLikeList, id)
        dispatch(actions.temporaryUnLiked(id))
    }

    try {
        return await videoService.unLikeVideo({
            videoID: id || video.id,
            accessToken,
        })
    } catch (error) {
        console.log(error)
    } finally {
        setIsCallingApi && setIsCallingApi(false)
    }
}

export const documentIsVisible = (video: HTMLVideoElement, isVisible = true, commentModalIsOpen = false) => {
    const handleVisibilityChange = () => {
        switch (document.visibilityState) {
            case 'hidden':
                video && isVisible && !video.paused && video.pause()
                break
            case 'visible':
                ;(async () => {
                    try {
                        video && isVisible && !commentModalIsOpen && video.paused && (await video.play())
                    } catch (error) {}
                })()
                break
            default:
                break
        }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
}
