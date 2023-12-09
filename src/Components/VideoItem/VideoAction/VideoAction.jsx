import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '~/redux'
import { removeDuplicate } from '~/hooks/removeDuplicate'
import useElementOnScreen from '~/hooks/useElementOnScreen'

import { FavoriteVideo } from '~/Components/Icons'
import { temporaryLiked, temporaryUnLiked } from '~/redux/selectors'
import * as videoService from '~/services/videoService'
import { currentUserData } from '~/App'
import style from './VideoAction.module.scss'
import VideoActionItem from './VideoActionItem'

const cx = classNames.bind(style)

function VideoAction({ data, videoRef }) {
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token
    const likeRef = useRef()

    const options = { root: null, rootMargin: '0px', threshold: 0.93 }
    const isVisible = useElementOnScreen(options, videoRef)

    const dispatch = useDispatch()
    const temporaryLikeList = useSelector(temporaryLiked)
    const temporaryUnLikeList = useSelector(temporaryUnLiked)

    const [isCallingApi, setIsCallingApi] = useState(false)

    const handleLikeVideo = async (id) => {
        try {
            const response = await videoService.likeVideo({
                videoID: id || data.id,
                accessToken,
            })

            removeDuplicate(temporaryUnLikeList, response.data.id)
            if (response) {
                if (!temporaryUnLikeList.includes(response.data.id)) {
                    dispatch(actions.temporaryLiked(response.data.id))
                }
            }

            return response
        } catch (error) {
            console.log(error)
        } finally {
            setIsCallingApi(false)
        }
    }

    const handleUnLikeVideo = async (id) => {
        try {
            const response = await videoService.unLikeVideo({
                videoID: id || data.id,
                accessToken,
            })

            if (response) {
                removeDuplicate(temporaryLikeList, response.data.id)
                dispatch(actions.temporaryUnLiked(response.data.id))
            }
            return response
        } catch (error) {
            console.log(error)
        } finally {
            setIsCallingApi(false)
        }
    }

    const handleToggleLike = () => {
        if (!currentUser || !accessToken) {
            dispatch(actions.openAuth(true))
            return
        }
        if (isCallingApi) {
            return
        }

        setIsCallingApi(true)

        if (data.is_liked || temporaryLikeList.includes(data.id)) {
            if (temporaryUnLikeList.includes(data.id)) {
                handleLikeVideo()
            } else {
                handleUnLikeVideo(videoRef.current.dataid)
            }
        } else {
            handleLikeVideo()
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.which) {
                case 76:
                    if (isVisible) {
                        handleToggleLike(videoRef.current.dataset.index)
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

    const handleChose = (type) => {
        switch (type) {
            case 'like':
                handleToggleLike()
                break
            default:
                break
        }
    }

    const likes_count = () => {
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
            icon: <FontAwesomeIcon icon={faHeart} />,
            disabled: isCallingApi,
            ref: likeRef,
        },
        {
            type: 'comment',
            value: data.comments_count,
            icon: <FontAwesomeIcon icon={faCommentDots} />,
        },
        {
            value: 0,
            icon: <FavoriteVideo />,
            toolTip: `The API dose not support favorite videos`,
        },
        {
            value: data.shares_count,
            icon: <FontAwesomeIcon icon={faShare} />,
            toolTip: `The API dose not support share videos`,
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
