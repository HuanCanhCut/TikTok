import classNames from 'classnames/bind'
import { memo, useRef, useState, useEffect, useCallback, useImperativeHandle, Dispatch, SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { forwardRef } from 'react'

import { authCurrentUser, commentModalOpen, mutedVideo } from '~/redux/selectors'
import { actions } from '~/redux'
import style from './Video.module.scss'
import useElementOnScreen from '~/hooks/useElementOnScreen'
import { Muted, UnMuted } from '../Icons'
import VideoAction from './VideoAction'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { listentEvent, sendEvent } from '~/helpers/event'
import { documentIsVisible } from '~/project/services'
import { VideoModal } from '~/modal/modal'

const cx = classNames.bind(style)

interface ImperativeHandle {
    PLAY: () => void
    PAUSE: () => void
    PAUSED: () => boolean | undefined
    SETCURRENTTIME: (currentTime: number) => void
    GETCURRENTTIME: () => number
}
interface Props {
    video: VideoModal
    videos: VideoModal[]
    setFocusedIndex: Dispatch<SetStateAction<number>>
}

const VideoItem = forwardRef<ImperativeHandle, Props>(({ video, videos, setFocusedIndex }, ref) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(authCurrentUser)
    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const mutedVideos = useSelector(mutedVideo)
    const commentModalIsOpen = useSelector(commentModalOpen)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [playing, setPlaying] = useState(false)
    const [authIsOpen, setAuthIsOpen] = useState(false)

    const resolutionX = video.meta.video.resolution_x
    const resolutionY = video.meta.video.resolution_y
    const videoSize = resolutionX > resolutionY ? 'row' : 'column'

    const options = { root: null, rootMargin: '0px', threshold: 0.5 }
    const isVisible = useElementOnScreen(options, videoRef)

    useImperativeHandle<ImperativeHandle, ImperativeHandle>(ref, () => ({
        PLAY: async () => {
            if (isVisible) {
                try {
                    await videoRef.current?.play()
                } catch (error) {
                    console.log(error)
                }
            }
        },
        PAUSE: () => {
            if (isVisible) {
                videoRef.current?.pause()
            }
        },
        PAUSED: () => {
            if (isVisible) {
                return videoRef.current?.paused
            }
        },
        SETCURRENTTIME: (currentTime: number) => {
            if (videoRef.current) {
                videoRef.current.currentTime = currentTime
            }
        },
        GETCURRENTTIME: () => {
            if (videoRef.current) {
                return videoRef.current?.currentTime
            }

            return 0
        },
    }))

    useEffect(() => {
        if (isVisible) {
            const videoIndex = videos.findIndex((item) => item.id === video.id)
            setFocusedIndex(videoIndex)
        }
    }, [isVisible, setFocusedIndex, video.id, videos])

    useEffect(() => {
        if (isVisible && videoRef.current) {
            sendEvent({ eventName: 'video:video-is-visible', detail: videoRef.current })
        } else {
            if (!videoRef.current?.paused) {
                videoRef.current?.pause()
            }
        }
    }, [isVisible])

    const handleTogglePlay = async () => {
        if (videoRef.current) {
            try {
                playing ? videoRef.current.pause() : await videoRef.current.play()
            } catch (e) {}
        }
    }

    useEffect(() => {
        const remove = videoRef.current ? documentIsVisible(videoRef.current, isVisible, commentModalIsOpen) : () => {}

        return remove
    }, [commentModalIsOpen, isVisible])

    useEffect(() => {
        const remove = listentEvent({
            eventName: 'auth:open-auth-modal',
            handler: ({ detail }) => {
                setAuthIsOpen(detail)
            },
        })

        return remove
    }, [])

    const handleToggleMuted = useCallback(() => {
        dispatch(actions.mutedVideo(!mutedVideos))
    }, [dispatch, mutedVideos])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.which) {
                case 77:
                    if (!authIsOpen) {
                        handleToggleMuted()
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
    }, [handleToggleMuted, mutedVideos, authIsOpen])

    const handleEnded = () => {
        videoRef.current && videoRef.current.play()
    }

    return (
        <div className={cx('wrapper', videoSize)}>
            <div className={cx('video-container')}>
                {video.file_url ? (
                    <video
                        ref={videoRef}
                        data-index={video.id}
                        src={video.file_url}
                        muted={mutedVideos}
                        poster={video.thumb_url}
                        className={cx('video')}
                        onPlay={() => {
                            setPlaying(true)
                        }}
                        onPause={() => {
                            setPlaying(false)
                        }}
                        onEnded={handleEnded}
                        onClick={() => {
                            if (!currentUser || !accessToken) {
                                sendEvent({ eventName: 'auth:open-auth-modal', detail: true })
                                return
                            }
                            sendEvent({ eventName: 'comment:open-comment-modal', detail: video })
                            dispatch(actions.commentModalOpen(true))

                            !videoRef.current?.paused && videoRef.current?.pause()
                        }}
                    ></video>
                ) : (
                    <img src={video.thumb_url} alt="" className={cx('video')} />
                )}

                <div className={cx('toggle-play')} onClick={handleTogglePlay}>
                    {!playing && (
                        <button className={cx('play')}>
                            <FontAwesomeIcon icon={faPlay as IconProp} />
                        </button>
                    )}

                    {playing && (
                        <button className={cx('pause')}>
                            <FontAwesomeIcon icon={faPause as IconProp} />
                        </button>
                    )}
                </div>

                <div className={cx('toggle-muted')} onClick={handleToggleMuted}>
                    <button className={cx('muted')}>
                        {mutedVideos ? <Muted width="26px" height="26px" /> : <UnMuted width="26px" height="26px" />}
                    </button>
                </div>

                <VideoAction video={video} videoRef={videoRef} />
            </div>
        </div>
    )
})

export default memo(VideoItem)
