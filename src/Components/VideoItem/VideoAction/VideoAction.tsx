import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '~/redux'
import { removeDuplicate } from '~/project/services'
import useElementOnScreen from '~/hooks/useElementOnScreen'
import { useTranslation } from 'react-i18next'

import { FavoriteVideo } from '~/Components/Icons'
import { authCurrentUser, temporaryLiked, temporaryUnLiked } from '~/redux/selectors'
import * as videoService from '~/services/videoService'
import style from './VideoAction.module.scss'
import VideoActionItem from './VideoActionItem'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { VideoListModal } from '../VideoItem'
import { sendEvent } from '~/helpers/event'

const cx = classNames.bind(style)

interface Props {
    data: VideoListModal
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
}

const VideoAction: React.FC<Props> = ({ data, videoRef }) => {
    const { t } = useTranslation()

    const currentUser = useSelector(authCurrentUser)
    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const options = { root: null, rootMargin: '0px', threshold: 0.93 }
    const isVisible = useElementOnScreen(options, videoRef)

    const dispatch = useDispatch()
    const temporaryLikeList = useSelector(temporaryLiked)
    const temporaryUnLikeList = useSelector(temporaryUnLiked)

    const [isCallingApi, setIsCallingApi] = useState(false)

    const handleLikeVideo = async (id: number) => {
        removeDuplicate(temporaryUnLikeList, id)
        if (id) {
            if (!temporaryUnLikeList.includes(id)) {
                dispatch(actions.temporaryLiked(id))
            }
        }

        try {
            return await videoService.likeVideo({
                videoID: id || data.id,
                accessToken,
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsCallingApi(false)
        }
    }

    const handleUnLikeVideo = async (id: number) => {
        if (id) {
            removeDuplicate(temporaryLikeList, id)
            dispatch(actions.temporaryUnLiked(id))
        }

        try {
            return await videoService.unLikeVideo({
                videoID: id || data.id,
                accessToken,
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsCallingApi(false)
        }
    }

    const handleToggleLike = () => {
        if (!currentUser || !accessToken) {
            sendEvent({ eventName: 'auth:open-auth-modal', detail: true })
            return
        }
        if (isCallingApi) {
            return
        }

        setIsCallingApi(true)

        if (data.is_liked || temporaryLikeList.includes(data.id)) {
            if (temporaryUnLikeList.includes(data.id)) {
                handleLikeVideo(data.id)
            } else {
                handleUnLikeVideo(data.id)
            }
        } else {
            handleLikeVideo(data.id)
        }
    }

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
    })

    const handleChose = (type: string) => {
        switch (type) {
            case 'like':
                handleToggleLike()
                break
            default:
                break
        }
    }

    const likes_count = () => {
        if (data.is_liked && !temporaryUnLikeList.includes(data.id)) {
            return data.likes_count
        }

        if (data.is_liked && temporaryUnLikeList.includes(data.id)) {
            return data.likes_count - 1
        }

        if (temporaryLikeList.includes(data.id)) {
            return data.likes_count + 1
        } else {
            return data.likes_count
        }
    }

    const items = [
        {
            type: 'like',
            value: likes_count(),
            icon: <FontAwesomeIcon icon={faHeart as IconProp} />,
            disabled: isCallingApi,
        },
        {
            type: 'comment',
            value: data.comments_count,
            icon: <FontAwesomeIcon icon={faCommentDots as IconProp} />,
        },
        {
            type: 'favorite',
            value: 0,
            icon: <FavoriteVideo />,
            toolTip: t('videos.the API dose not support favorite videos'),
        },
        {
            type: 'share',
            value: data.shares_count,
            icon: <FontAwesomeIcon icon={faShare as IconProp} />,
        },
    ]

    return (
        <div className={cx('wrapper')}>
            {items.map((item, index) => {
                return <VideoActionItem key={index} item={item} data={data} onChose={handleChose} />
            })}
        </div>
    )
}

export default VideoAction
