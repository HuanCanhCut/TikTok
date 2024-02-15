import classNames from 'classnames/bind'
import style from './VideoPreview.module.scss'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

import PreviewInfo from '../PreviewInfo'
import SidebarPreview from '../SidebarPreview'

const cx = classNames.bind(style)

function TogglePlay({ videoRef }) {
    const [isPlaying, setIsPlaying] = useState(videoRef.current && videoRef.current.paused)

    const handleTogglePlay = () => {
        if (!videoRef.current) {
            return
        }

        if (videoRef.current.paused) {
            videoRef.current.play()
            setIsPlaying(true)
        } else {
            videoRef.current.pause()
            setIsPlaying(false)
        }
    }

    useEffect(() => {
        const handleResetVideo = () => {
            videoRef.current.currentTime = 0
            setIsPlaying(false)
        }

        if (videoRef.current) {
            videoRef.current.addEventListener('ended', handleResetVideo)
        }
    }, [videoRef])

    return (
        <>
            <div className={cx('toggle-play')} onClick={handleTogglePlay}>
                {isPlaying ? (
                    <FontAwesomeIcon icon={faPause} className={cx('pause-icon')} />
                ) : (
                    <FontAwesomeIcon icon={faPlay} className={cx('play-icon')} />
                )}
            </div>
            <PreviewInfo isPlay={true} />
            <SidebarPreview isPlay={true} />
        </>
    )
}

export default TogglePlay
