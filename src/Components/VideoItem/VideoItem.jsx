/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { memo, useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'

import { mutedVideo } from '~/redux/selectors'
import { actions } from '~/redux'
import style from './Video.module.scss'
import useElementOnScreen from '~/hooks/useElementOnScreen'
import { Muted, UnMuted } from '../Icons'
import VideoAction from './VideoAction'

const cx = classNames.bind(style)

function VideoItem({ video }) {
    const dispatch = useDispatch()
    const mutedVideos = useSelector(mutedVideo)
    const videoRef = useRef(null)
    const [playing, setPlaying] = useState(false)

    const resolutionX = video.meta.video.resolution_x
    const resolutionY = video.meta.video.resolution_y
    const videoSize = resolutionX > resolutionY ? 'row' : 'column'

    const options = { root: null, rootMargin: '0px', threshold: 0.95 }
    const isVisible = useElementOnScreen(options, videoRef)

    useEffect(() => {
        if (isVisible && videoRef.current) {
            if (!playing) {
                videoRef.current.currentTime = 0
                videoRef.current.play()
            }
        } else {
            if (playing) {
                videoRef.current.pause()
            }
        }
    }, [isVisible])

    const handleTogglePlay = () => {
        playing ? videoRef.current.pause() : videoRef.current.play()
    }

    const handleToggleMuted = () => {
        dispatch(actions.mutedVideo(!mutedVideos))
    }

    const handleEnded = () => {
        videoRef.current.play()
    }

    return (
        <div className={cx('wrapper', videoSize)}>
            <div className={cx('video-container')}>
                {video.file_url ? (
                    <video
                        ref={videoRef}
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
                            <FontAwesomeIcon icon={faPlay} />
                        </button>
                    )}

                    {playing && (
                        <button className={cx('pause')}>
                            <FontAwesomeIcon icon={faPause} />
                        </button>
                    )}
                </div>

                <div className={cx('toggle-muted')} onClick={handleToggleMuted}>
                    <button className={cx('muted')}>
                        {mutedVideos ? <Muted width="26px" height="26px" /> : <UnMuted width="26px" height="26px" />}
                    </button>
                </div>

                <VideoAction data={video} />
            </div>
        </div>
    )
}

VideoItem.propTypes = {
    video: PropTypes.object.isRequired,
}

export default memo(VideoItem)
