import classNames from 'classnames/bind'
import style from './VideoAction.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons'
import { useCallback } from 'react'
import VideoActionItem from './VideoActionItem'

const cx = classNames.bind(style)

function VideoAction({ data }) {
    const handleLikeVideo = () => {}
    useCallback(handleLikeVideo, [])

    const items = [
        {
            value: data.likes_count,
            icon: <FontAwesomeIcon icon={faHeart} />,
            func: handleLikeVideo,
        },
        {
            value: data.comments_count,
            icon: <FontAwesomeIcon icon={faCommentDots} />,
            func: handleLikeVideo,
        },
        {
            value: 0,
            icon: <FontAwesomeIcon icon={faBookmark} />,
            func: handleLikeVideo,
        },
        {
            value: data.share_count,
            icon: <FontAwesomeIcon icon={faShare} />,
            func: handleLikeVideo,
        },
    ]

    return (
        <div className={cx('wrapper')}>
            {items.map((item, index) => {
                return (
                    <VideoActionItem
                        key={index}
                        className={cx('video-active-icon')}
                        value={item.value}
                        icon={item.icon}
                        handleClick={item.func}
                    />
                )
            })}
        </div>
    )
}

export default VideoAction
