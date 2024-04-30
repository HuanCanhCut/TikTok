import classNames from 'classnames/bind'
import style from './CommentModal.module.scss'
import { VideoModal } from '~/modal/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { actions } from '~/redux'
import { useEffect } from 'react'
import { sendEvent } from '~/helpers/event'

const cx = classNames.bind(style)

interface Props {
    video: VideoModal
    videoList: VideoModal[]
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
}

const CommentModal: React.FC<Props> = ({ video, videoList, videoRef }) => {
    const dispatch = useDispatch()

    const handleCloseModal = () => {
        videoRef.current?.paused && videoRef.current?.play()
        dispatch(actions.commentModalOpen(false))
    }

    return (
        <div className={cx('wrapper')}>
            <button className={cx('close-modal')} onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faXmark as IconProp} />
            </button>
            <div className={cx('video-container')}>
                <img src={video.thumb_url} alt="" className={cx('video-overlay')} />
            </div>
            <div className={cx('comment-container')}></div>
        </div>
    )
}

export default CommentModal
