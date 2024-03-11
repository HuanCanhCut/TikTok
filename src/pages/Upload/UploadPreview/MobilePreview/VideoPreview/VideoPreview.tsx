import classNames from 'classnames/bind'
import style from './VideoPreview.module.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { fileUploadContext } from '~/pages/Upload/Upload'
import TogglePlay from './TogglePlay'

const cx = classNames.bind(style)

function VideoPreview() {
    const [videoRatio, setVideoRatio] = useState('column')

    const currentFile = useContext(fileUploadContext)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.addEventListener('loadedmetadata', () => {
                if (currentFile && videoRef.current) {
                    currentFile.file.width = videoRef.current.videoWidth
                    currentFile.file.height = videoRef.current.videoHeight

                    currentFile.file.ratio = currentFile.file.width > currentFile.file.height ? 'row' : 'column'

                    const ratio = currentFile.file.width > currentFile.file.height ? 'row' : 'column'

                    setVideoRatio(ratio)
                }
            })
        }
    }, [videoRef, currentFile])

    return (
        <div className={cx('mobile-video')} tabIndex={10}>
            {currentFile && (
                <video
                    ref={videoRef}
                    src={currentFile.file.preview}
                    className={cx('video-preview', videoRatio)}
                    onEnded={() => {
                        if (videoRef.current) {
                            videoRef.current.currentTime = 0
                        }
                    }}
                ></video>
            )}
            <TogglePlay videoRefCurrent={videoRef.current} />
        </div>
    )
}

export default VideoPreview
