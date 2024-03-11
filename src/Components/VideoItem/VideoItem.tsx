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

const VideoItem = ({ video }: { video: VideoListModal }) => {
    const dispatch = useDispatch()
    const mutedVideos = useSelector(mutedVideo)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [playing, setPlaying] = useState(false)

    const resolutionX = video.meta.video.resolution_x
    const resolutionY = video.meta.video.resolution_y
    const videoSize = resolutionX > resolutionY ? 'row' : 'column'

    const options = { root: null, rootMargin: '0px', threshold: 0.93 }
    const isVisible = useElementOnScreen(options, videoRef)

    useEffect(() => {
        const playVideo = async () => {
            if (isVisible && videoRef.current) {
                try {
                    videoRef.current.currentTime = 0
                    await videoRef.current.play()
                } catch (e) {}
            } else {
                videoRef.current && videoRef.current.pause()
            }
        }
        playVideo()
    }, [isVisible])

    const handleTogglePlay = () => {
        if (videoRef.current) {
            playing ? videoRef.current.pause() : videoRef.current.play()
        }
    }

    const handleToggleMuted = useCallback(() => {
        dispatch(actions.mutedVideo(!mutedVideos))
    }, [dispatch, mutedVideos])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.which) {
                case 77:
                    handleToggleMuted()
                    break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleToggleMuted, mutedVideos])

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
