import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { likeVideo, unLikeVideo } from '~/project/services'
import useElementOnScreen from '~/hooks/useElementOnScreen'
import { actions } from '~/redux'
import { FavoriteVideo } from '~/Components/Icons'
import { authCurrentUser, temporaryLiked, temporaryUnLiked } from '~/redux/selectors'
import style from './VideoAction.module.scss'
import VideoActionItem from './VideoActionItem'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { sendEvent } from '~/helpers/event'
import { VideoModal } from '~/modal/modal'

const cx = classNames.bind(style)

interface Props {
    video: VideoModal
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
}

const VideoAction: React.FC<Props> = ({ video, videoRef }) => {
    const currentUser = useSelector(authCurrentUser)
    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const options = { root: null, rootMargin: '0px', threshold: 0.93 }
    const isVisible = useElementOnScreen(options, videoRef)

    const dispatch = useDispatch()
    const temporaryLikeList: number[] = useSelector(temporaryLiked)
    const temporaryUnLikeList: number[] = useSelector(temporaryUnLiked)

    const [isCallingApi, setIsCallingApi] = useState(false)

    const handleLikeVideo = useCallback(
        (id: number) => {
            likeVideo({
                id: id,
                video: video,
                accessToken,
                dispatch,
                temporaryUnLikeList,
                setIsCallingApi,
            })
        },
        [accessToken, dispatch, temporaryUnLikeList, video]
    )

    const handleUnLikeVideo = useCallback(
        (id: number) => {
            unLikeVideo({
                id: id,
                video: video,
                accessToken,
                dispatch,
                temporaryLikeList,
                setIsCallingApi,
            })
        },
        [accessToken, dispatch, temporaryLikeList, video]
    )

    const handleToggleLike = useCallback(() => {
        if (!currentUser || !accessToken) {
            sendEvent({ eventName: 'auth:open-auth-modal', detail: true })
            return
        }
        if (isCallingApi) {
            return
        }

        setIsCallingApi(true)

        if (video.is_liked || temporaryLikeList.includes(video.id)) {
            if (temporaryUnLikeList.includes(video.id)) {
                handleLikeVideo(video.id)
            } else {
                handleUnLikeVideo(video.id)
            }
        } else {
            handleLikeVideo(video.id)
        }
    }, [
        accessToken,
        currentUser,
        handleLikeVideo,
        handleUnLikeVideo,
        isCallingApi,
        temporaryLikeList,
        temporaryUnLikeList,
        video.id,
        video.is_liked,
    ])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'l':
                    if (isVisible) {
                        handleToggleLike()
                    }
                    break
                default:
                    break
            }
        }
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleToggleLike, isVisible])

    const handleOpenCommentModal = useCallback(
        (video: VideoModal) => {
            sendEvent({ eventName: 'comment:open-comment-modal', detail: video })
            dispatch(actions.commentModalOpen(true))

            !videoRef.current?.paused && videoRef.current?.pause()
        },
        [dispatch, videoRef]
    )

    const handleChose = useCallback(
        (type: string) => {
            switch (type) {
                case 'like':
                    handleToggleLike()
                    break
                case 'comment':
                    handleOpenCommentModal(video)
                    break
                default:
                    break
            }
        },
        [handleOpenCommentModal, handleToggleLike, video]
    )

    const likes_count = useCallback(() => {
        if (video.is_liked && !temporaryUnLikeList.includes(video.id)) {
            return video.likes_count
        }

        if (video.is_liked && temporaryUnLikeList.includes(video.id)) {
            return video.likes_count - 1
        }

        if (temporaryLikeList.includes(video.id)) {
            return video.likes_count + 1
        } else {
            return video.likes_count
        }
    }, [temporaryLikeList, temporaryUnLikeList, video.id, video.is_liked, video.likes_count])

    const items = useMemo(() => {
        return [
            {
                type: 'like',
                value: likes_count(),
                icon: <FontAwesomeIcon icon={faHeart as IconProp} />,
                disabled: isCallingApi,
            },
            {
                type: 'comment',
                value: video.comments_count,
                icon: <FontAwesomeIcon icon={faCommentDots as IconProp} />,
            },
            {
                type: 'favorite',
                value: 0,
                icon: <FavoriteVideo />,
                disabled: true,
            },
            {
                type: 'share',
                value: video.shares_count,
                icon: <FontAwesomeIcon icon={faShare as IconProp} />,
            },
        ]
    }, [isCallingApi, likes_count, video.comments_count, video.shares_count])

    return (
        <div className={cx('wrapper')}>
            {items.map((item, index) => {
                return (
                    <VideoActionItem
                        key={index}
                        item={item}
                        video={video}
                        onChose={handleChose}
                        temporaryLikeList={temporaryLikeList}
                        temporaryUnLikeList={temporaryUnLikeList}
                    />
                )
            })}
        </div>
    )
}

export default VideoAction
