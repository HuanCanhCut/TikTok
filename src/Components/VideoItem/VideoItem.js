import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './Video.module.scss'
import { memo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(style)

function VideoItem({ video }) {
    const resolutionX = video.meta.video.resolution_x
    const resolutionY = video.meta.video.resolution_y
    const videoSize = resolutionX > resolutionY ? 'row' : 'column'
    const [isPlay, setIsPlay] = useState(false)
    const videoRef = useRef()

    const handlePlay = () => {
        setIsPlay(true)
    }

    const handlePause = () => {
        setIsPlay(false)
    }

    const handleTogglePlay = () => {
        isPlay ? videoRef.current.pause() : videoRef.current.play()
    }

    return (
        <div className={cx('wrapper', videoSize)}>
            <div className={cx('video-container')}>
                <video
                    ref={videoRef}
                    src={video.file_url}
                    poster={video.thumb_url}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    className={cx('video')}
                ></video>

                <div className={cx('toggle-play')} onClick={handleTogglePlay}>
                    {!isPlay && (
                        <button className={cx('play')}>
                            <FontAwesomeIcon icon={faPlay} />
                        </button>
                    )}

                    {isPlay && (
                        <button className={cx('pause')}>
                            <FontAwesomeIcon icon={faPause} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

VideoItem.propTypes = {
    video: PropTypes.object.isRequired,
}

export default memo(VideoItem)
