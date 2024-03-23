import classNames from 'classnames/bind'
import { memo, useRef, useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'

import { mutedVideo } from '~/redux/selectors'
import { actions } from '~/redux'
import style from './Video.module.scss'
import useElementOnScreen from '~/hooks/useElementOnScreen'
import { Muted, UnMuted } from '../Icons'
import VideoAction from './VideoAction'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { UserModal } from '~/modal/modal'
import { listentEvent, sendEvent } from '~/helpers/event'

const cx = classNames.bind(style)

interface Resolution {
    resolution_x: number
    resolution_y: number
}

interface Video {
    video: Resolution
}

export interface VideoListModal {
    id: number
    is_liked: boolean
    likes_count: number
    comments_count: number
    shares_count: number
    file_url: string
    thumb_url: string
    user: UserModal
    meta: Video
}

interface Props {
    video: VideoListModal
}

const VideoItem: React.FC<Props> = ({ video }) => {
    const dispatch = useDispatch()
    const mutedVideos = useSelector(mutedVideo)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [playing, setPlaying] = useState(false)
    const [authIsOpen, setAuthIsOpen] = useState(false)

    const resolutionX = video.meta.video.resolution_x
    const resolutionY = video.meta.video.resolution_y
    const videoSize = resolutionX > resolutionY ? 'row' : 'column'

    const options = { root: null, rootMargin: '0px', threshold: 0.5 }
    const isVisible = useElementOnScreen(options, videoRef)

    useEffect(() => {
        if (isVisible && videoRef.current) {
            sendEvent({ eventName: 'video:video-isvisible', detail: videoRef.current })
        } else {
            if (!videoRef.current?.paused) {
                videoRef.current?.pause()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible])

    const handleTogglePlay = () => {
        if (videoRef.current) {
            playing ? videoRef.current.pause() : videoRef.current.play()
        }
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState) {
                switch (document.visibilityState) {
                    case 'hidden':
                        videoRef.current && isVisible && videoRef.current.pause()
                        console.log(videoRef.current)
                        break
                    case 'visible':
                        videoRef.current && isVisible && videoRef.current.play()

                        break
                    default:
                        break
                }
            }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [isVisible])

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

                <VideoAction data={video} videoRef={videoRef} />
            </div>
        </div>
    )
}

export default memo(VideoItem)
