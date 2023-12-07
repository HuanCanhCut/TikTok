import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '~/redux'
import { removeDuplicate } from '~/hooks/removeDuplicate'

import { FavoriteVideo } from '~/Components/Icons'
import { temporaryLiked, temporaryUnLiked } from '~/redux/selectors'
import * as videoService from '~/services/videoService'
import { currentUserData } from '~/App'
import style from './VideoAction.module.scss'
import VideoActionItem from './VideoActionItem'

const cx = classNames.bind(style)

function VideoAction({ data }) {
    const dispatch = useDispatch()
    const temporaryLikeList = useSelector(temporaryLiked)
    const temporaryUnLikeList = useSelector(temporaryUnLiked)
    const [isLiked, setIsLiked] = useState(data.is_liked)

    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    const handleLikeVideo = async () => {
        const response = await videoService.likeVideo({
            videoID: data.id,
            accessToken,
        })

        response && setIsLiked((prev) => prev + 1)

        removeDuplicate(temporaryUnLikeList, response.data.id)
        if (!temporaryUnLikeList.includes(response.data.id)) {
            dispatch(actions.temporaryLiked(response.data.id))
        }

        return response
    }

    const handleUnLikeVideo = async () => {
        const response = await videoService.unLikeVideo({
            videoID: data.id,
            accessToken,
        })

        response && setIsLiked((prev) => prev - 1)

        removeDuplicate(temporaryLikeList, response.data.id)
        dispatch(actions.temporaryUnLiked(response.data.id))
        return response
    }

    const handleToggleLike = () => {
        if (!currentUser || !accessToken) {
            alert('Please login')
            return
        }
        try {
            if (data.is_liked || temporaryLikeList.includes(data.id)) {
                if (temporaryUnLikeList.includes(data.id)) {
                    handleLikeVideo()
                } else {
                    handleUnLikeVideo()
                }
            } else {
                handleLikeVideo()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChose = (type) => {
        switch (type) {
            case 'like':
                handleToggleLike()
                break
            default:
                break
        }
    }

    const items = [
        {
            type: 'like',
            value: isLiked ? data.likes_count + 1 : data.likes_count,
            icon: <FontAwesomeIcon icon={faHeart} />,
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
