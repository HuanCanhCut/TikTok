import classNames from 'classnames/bind'
import style from './CommentModal.module.scss'
import { VideoModal } from '~/modal/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight, faPlay, faXmark } from '@fortawesome/free-solid-svg-icons'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Search from '~/Components/Search'
import { mutedVideo } from '~/redux/selectors'
import { useSelector } from 'react-redux'
import { Muted, UnMuted } from '~/Components/Icons'

const cx = classNames.bind(style)

interface Props {
    video: VideoModal
    videoList: VideoModal[]
    closeCommentModal: (video: MutableRefObject<HTMLVideoElement | null>) => void
    currentTime?: number
    scrollNextVideo?: () => void
    scrollPrevVideo?: () => void
}

const CommentModal: React.FC<Props> = ({
    video,
    videoList,
    closeCommentModal,
    currentTime,
    scrollNextVideo,
    scrollPrevVideo,
}) => {
    const [currentVideo, setCurrentVideo] = useState(video)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(() => {
        return videoList.findIndex((item) => item.id === video.id)
    })
    const [isPlaying, setIsPlaying] = useState(true)
    const isMutedVideo = useSelector(mutedVideo)

    const resolutionX = currentVideo.meta.video.resolution_x
    const resolutionY = currentVideo.meta.video.resolution_y
    const videoSize = resolutionX > resolutionY ? 'row' : 'column'

    const videoModalRef = useRef<HTMLVideoElement | null>(null)

    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        isPlaying ? videoModalRef.current?.play() : videoModalRef.current?.pause()
    }, [isPlaying])

    useEffect(() => {
        if (videoModalRef.current) {
            videoModalRef.current.currentTime = currentTime || 0
        }
    }, [currentTime])

    useEffect(() => {
        setCurrentVideo(videoList[currentVideoIndex])
    }, [currentVideoIndex, videoList])

    const handleNextVideo = () => {
        setCurrentVideoIndex((prev) => prev + 1)
        scrollNextVideo && scrollNextVideo()
    }

    const handlePrevVideo = () => {
        setCurrentVideoIndex((prev) => prev - 1)
        scrollPrevVideo && scrollPrevVideo()
    }

    return (
        <div className={cx('wrapper')}>
            <button
                className={cx('close-modal')}
                onClick={() => {
                    closeCommentModal(videoModalRef)
                }}
            >
                <FontAwesomeIcon icon={faXmark as IconProp} />
            </button>
            <div className={cx('video-wrapper')}>
                <img src={currentVideo.thumb_url} alt="" className={cx('thumb-overlay')} />
                <div className={cx('video-container')} onClick={handleTogglePlay}>
                    <video
                        ref={videoModalRef}
                        src={currentVideo.file_url}
                        className={cx('video', videoSize)}
                        autoPlay
                    ></video>
                </div>
                <Search className={cx('search')} />
                <div className={cx('toggle-play')}>{!isPlaying && <FontAwesomeIcon icon={faPlay} />}</div>
                <div className={cx('switch-video')}>
                    {currentVideo.id !== videoList[0].id && (
                        <button className={cx('prev-video')} onClick={handlePrevVideo}>
                            <FontAwesomeIcon icon={faChevronLeft as IconProp} />
                        </button>
                    )}
                    {currentVideo.id !== videoList[videoList.length - 1].id && (
                        <button className={cx('next-video')} onClick={handleNextVideo}>
                            <FontAwesomeIcon icon={faChevronRight as IconProp} />
                        </button>
                    )}
                </div>
                <button className={cx('mute-video')}>
                    {isMutedVideo ? <Muted width="24" height="24" /> : <UnMuted width="24" height="24" />}
                </button>
            </div>
            <div className={cx('comment-container')}></div>
        </div>
    )
}

export default CommentModal
