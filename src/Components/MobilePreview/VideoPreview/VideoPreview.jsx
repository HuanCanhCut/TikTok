import classNames from 'classnames/bind'
import style from './VideoPreview.module.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { fileUploadContext } from '~/pages/Upload/Upload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import PreviewInfo from '../PreviewInfo'
import SidebarPreview from '../SidebarPreview'

const cx = classNames.bind(style)

function VideoPreview() {
    console.log('re-render')
    const currentFile = useContext(fileUploadContext)
    const videoRef = useRef()
    const [videoRatio, setVideoRatio] = useState()
    const [isPlay, setIsPlay] = useState(false)

    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.addEventListener('loadedmetadata', () => {
                currentFile.file.width = videoRef.current.videoWidth
                currentFile.file.height = videoRef.current.videoHeight

                currentFile.file.ratio = currentFile.file.width > currentFile.file.height ? 'row' : 'column'

                setVideoRatio(currentFile.file.width > currentFile.file.height ? 'row' : 'column')
            })
        }
    }, [videoRef, currentFile])

    const handleTogglePlay = async () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                try {
                    videoRef.current.play()
                } finally {
                    setIsPlay(true)
                }
            } else {
                videoRef.current.pause()
                setIsPlay(false)
            }
        }
    }

    return (
        <div className={cx('mobile-video')} tabIndex={10}>
            <video
                ref={videoRef}
                src={currentFile.file.preview}
                className={cx('video-preview', videoRatio)}
                onEnded={() => {
                    setIsPlay(false)
                    videoRef.current.currentTime = 0
                }}
            ></video>
            <div className={cx('toggle-play')} onClick={handleTogglePlay}>
                {isPlay ? (
                    <FontAwesomeIcon icon={faPause} className={cx('pause-icon')} />
                ) : (
                    <FontAwesomeIcon icon={faPlay} className={cx('play-icon')} />
                )}
            </div>
            <PreviewInfo isPlay={isPlay} />
            <SidebarPreview isPlay={isPlay} />
        </div>
    )
}

export default VideoPreview
