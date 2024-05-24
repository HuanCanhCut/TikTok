import classNames from 'classnames/bind'
import style from './CommentModal.module.scss'
import { VideoModal } from '~/modal/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight, faPlay, faXmark } from '@fortawesome/free-solid-svg-icons'
import { MutableRefObject, useEffect, useRef, useState, memo } from 'react'
import ReactModal from 'react-modal'

import Search from '~/Components/Search'
import { Muted, UnMuted } from '~/Components/Icons'
import Header from './Header'
import CommentBody from './CommentBody'
import PostComment from './PostComment'
import { sendEvent } from '~/helpers/event'
import Button from '~/Components/Button'

const cx = classNames.bind(style)

interface Props {
    isOpen: boolean
    video: VideoModal
    videoList: VideoModal[]
    closeCommentModal: (video: MutableRefObject<HTMLVideoElement | null>) => void
    currentTime?: number
    scrollNextVideo?: () => void
    scrollPrevVideo?: () => void
}

const CommentModal: React.FC<Props> = ({
    isOpen,
    video,
    videoList,
    closeCommentModal,
    currentTime = 0,
    scrollNextVideo = () => {},
    scrollPrevVideo = () => {},
}) => {
    const [currentVideo, setCurrentVideo] = useState(video)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(() => {
        return videoList.findIndex((item) => item.id === video.id)
    })
    const [isPlaying, setIsPlaying] = useState(true)
    const [muteVideo, setMuteVideo] = useState(false)
    const [backToTop, setBackToTop] = useState(false)

    const resolutionX = currentVideo.meta.video.resolution_x
    const resolutionY = currentVideo.meta.video.resolution_y
    const videoSize = resolutionX > resolutionY ? 'row' : 'column'

    const videoModalRef = useRef<HTMLVideoElement | null>(null)
    const commentContainerRef = useRef<HTMLDivElement | null>(null)
    const scrollTopRef = useRef<HTMLDivElement | null>(null)

    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        window.history.replaceState({}, '', `@${video.user.nickname}/video/${video.uuid}`)
    }, [video])

    useEffect(() => {
        ;(async () => {
            try {
                isPlaying ? await videoModalRef.current?.play() : videoModalRef.current?.pause()
            } catch (error) {}
        })()
    }, [isPlaying])

    useEffect(() => {
        if (videoModalRef.current && currentTime) {
            videoModalRef.current.currentTime = currentTime
        }
    }, [currentTime])

    useEffect(() => {
        setCurrentVideo(videoList[currentVideoIndex])
    }, [currentVideoIndex, videoList])

    const handleNextVideo = (useKeyboard?: boolean) => {
        if (currentVideoIndex === videoList.length - 1) {
            return
        }

        setCurrentVideoIndex(currentVideoIndex + 1)
        setIsPlaying(true)
        !useKeyboard && scrollNextVideo && scrollNextVideo()
    }

    const handlePrevVideo = (useKeyboard?: boolean) => {
        if (currentVideoIndex === 0) {
            return
        }
        setCurrentVideoIndex(currentVideoIndex - 1)
        setIsPlaying(true)
        !useKeyboard && scrollPrevVideo && scrollPrevVideo()
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    closeCommentModal(videoModalRef)
                    break
                case 'ArrowDown':
                    handleNextVideo(true)
                    break
                case 'ArrowUp':
                    handlePrevVideo(true)
                    break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [closeCommentModal])

    const handleMuteVideo = () => {
        setMuteVideo(!muteVideo)
    }

    const handleScroll = (e: any) => {
        if (!commentContainerRef.current) {
            return
        }

        setBackToTop(e.target.scrollTop > 20)

        // add more 1 px when scrolling down
        if (e.target.scrollTop + e.target.offsetHeight + 1 >= commentContainerRef.current.offsetHeight) {
            sendEvent({ eventName: 'comment:load-more-comment' })
        }
    }

    const handleBackToTop = () => {
        scrollTopRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeCommentModal}
            overlayClassName={'overlay'}
            ariaHideApp={false}
            className={'modal'}
            closeTimeoutMS={200}
            shouldCloseOnEsc={false}
            onKeyDown={(e: any) => {
                if (e.key === 'Escape') {
                    e.preventDefault()
                    e.stopPropagation()
                }
            }}
        >
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
                            muted={muteVideo}
                            autoPlay
                            onEnded={(e: any) => {
                                e.target.play()
                            }}
                        ></video>
                    </div>
                    <Search className={cx('search')} />
                    <div className={cx('toggle-play')}>{!isPlaying && <FontAwesomeIcon icon={faPlay} />}</div>
                    <div className={cx('switch-video')}>
                        {currentVideo.id !== videoList[0].id && (
                            <button
                                className={cx('prev-video')}
                                onClick={() => {
                                    handlePrevVideo(false)
                                }}
                            >
                                <FontAwesomeIcon icon={faChevronLeft as IconProp} />
                            </button>
                        )}
                        {currentVideo.id !== videoList[videoList.length - 1].id && (
                            <button
                                className={cx('next-video')}
                                onClick={() => {
                                    handleNextVideo(false)
                                }}
                            >
                                <FontAwesomeIcon icon={faChevronRight as IconProp} />
                            </button>
                        )}
                    </div>
                    <button className={cx('mute-video')} onClick={handleMuteVideo}>
                        {muteVideo ? <Muted width="24" height="24" /> : <UnMuted width="24" height="24" />}
                    </button>
                </div>
                <div className={cx('comment-wrapper')}>
                    <div className={cx('comment-container')} onScroll={handleScroll}>
                        <div ref={commentContainerRef}>
                            <div className={cx('scroll-top')} ref={scrollTopRef}></div>
                            <Header currentVideo={currentVideo} />
                            <CommentBody currentVideo={currentVideo} />
                        </div>
                        {backToTop && (
                            <Button rounded className={cx('back-to-top')} onClick={handleBackToTop}>
                                Back to top
                            </Button>
                        )}
                    </div>
                    {currentVideo.allows.includes('comment') && <PostComment currentVideo={currentVideo} />}
                </div>
            </div>
        </ReactModal>
    )
}

export default memo(CommentModal)
