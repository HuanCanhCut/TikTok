import classNames from 'classnames/bind'
import style from './VideoPreview.module.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { fileUploadContext } from '~/pages/Upload/Upload'
import TogglePlay from './TogglePlay'

const cx = classNames.bind(style)

function VideoPreview() {
    const [videoRatio, setVideoRatio] = useState()

    const currentFile = useContext(fileUploadContext)
    const videoRef = useRef()

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

    return (
        <div className={cx('mobile-video')} tabIndex={10}>
            <video
                ref={videoRef}
                src={currentFile.file.preview}
                className={cx('video-preview', videoRatio)}
                onEnded={() => {
                    videoRef.current.currentTime = 0
                }}
            ></video>
            <TogglePlay videoRef={videoRef} />
        </div>
    )
}

export default VideoPreview
