import classNames from 'classnames/bind'
import style from './VideoPreview.module.scss'
import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

import PreviewInfo from '../PreviewInfo'
import SidebarPreview from '../SidebarPreview'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const cx = classNames.bind(style)

interface Props {
    videoRefCurrent: HTMLVideoElement | null
}

const TogglePlay: React.FC<Props> = ({ videoRefCurrent }) => {
    const [isPlaying, setIsPlaying] = useState<boolean | null>(videoRefCurrent && videoRefCurrent.paused)

    const handlePauseVideo = useCallback(() => {
        videoRefCurrent && videoRefCurrent.pause()
        setIsPlaying(false)
    }, [videoRefCurrent])

    const handleTogglePlay = () => {
        if (!videoRefCurrent) {
            return
        }

        if (videoRefCurrent.paused) {
            videoRefCurrent.play()
            setIsPlaying(true)
        } else {
            handlePauseVideo()
        }
    }

    useEffect(() => {
        if (videoRefCurrent) {
            videoRefCurrent.addEventListener('ended', handlePauseVideo)
        }
    }, [handlePauseVideo, videoRefCurrent])

    return (
        <>
            <div className={cx('toggle-play')} onClick={handleTogglePlay}>
                {isPlaying ? (
                    <FontAwesomeIcon icon={faPause as IconProp} className={cx('pause-icon')} />
                ) : (
                    <FontAwesomeIcon icon={faPlay as IconProp} className={cx('play-icon')} />
                )}
            </div>
            <>
                <PreviewInfo isPlay={isPlaying} />
                <SidebarPreview isPlay={isPlaying} />
            </>
        </>
    )
}

export default TogglePlay
