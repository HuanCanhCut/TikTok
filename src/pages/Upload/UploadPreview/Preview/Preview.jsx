import classNames from 'classnames/bind'
import style from './Preview.module.scss'
import { useContext, memo, useEffect, useRef, useState } from 'react'

import MobilePreview from '../MobilePreview'
import UploadDrop from '../../UploadDrop'
import { fileUploadContext } from '../../Upload'
import FormControl from '../FormControl'
import { listentEvent } from '~/helpers/event'

const cx = classNames.bind(style)

let durationFinished = 3
const slideQuantity = 8

function Preview() {
    const currentFile = useContext(fileUploadContext)

    const [videoDuration, setVideoDuration] = useState()
    const [captureImages, setCaptureImages] = useState([])
    const [isIntervalActive, setIsIntervalActive] = useState(true)

    useEffect(() => {
        const remove = listentEvent('upload:cancel-upload-file', () => {
            currentFile.setFile(null)
            setCaptureImages([])
            setIsIntervalActive(true)
            captureImagesRef.current.forEach((url) => {
                URL.revokeObjectURL(url)
            })
        })
        return remove
    }, [currentFile])

    const canvasRef = useRef(null)
    const captureImagesRef = useRef(captureImages)
    const videoCaptureRef = useRef(null)
    const intervalRef = useRef(null)

    const handleCapture = () => {
        if (videoCaptureRef.current && canvasRef.current) {
            canvasRef.current.width = videoCaptureRef.current.videoWidth
            canvasRef.current.height = videoCaptureRef.current.videoHeight

            canvasRef.current
                .getContext('2d')
                .drawImage(videoCaptureRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

            canvasRef.current.toBlob((blob) => {
                const blobImg = URL.createObjectURL(blob)
                setCaptureImages((prev) => [...prev, blobImg])
            })
        }
    }

    const handlePlayVideo = (e) => {
        if (currentFile.file) {
            if (e.target.duration / 16 > durationFinished) {
                durationFinished = e.target.duration / 16
            }

            if (e.target.duration) {
                // playbackRate rate limit is 16
                e.target.playbackRate = Math.min(16, e.target.duration / durationFinished)
            }
        }
    }

    useEffect(() => {
        captureImagesRef.current = captureImages
    }, [captureImages])

    useEffect(() => {
        return () => {
            captureImagesRef.current.forEach((url) => {
                URL.revokeObjectURL(url)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (captureImages.length >= slideQuantity) {
            setIsIntervalActive(false)
        }
    }, [captureImages.length])

    useEffect(() => {
        if (videoDuration) {
            if (videoDuration / 16 > durationFinished) {
                durationFinished = videoDuration / 16
            }
            if (isIntervalActive) {
                intervalRef.current = setInterval(() => {
                    if (videoCaptureRef.current) {
                        handleCapture()
                    }
                }, (durationFinished / slideQuantity) * 1000)
            }

            return () => {
                clearInterval(intervalRef.current)
            }
        }
    }, [isIntervalActive, captureImages, currentFile.file, videoDuration])

    return (
        <div className={cx('wrapper')}>
            {currentFile.file && (
                <>
                    <canvas ref={canvasRef} id={cx('canvas')} tabIndex={-1}></canvas>
                    <video
                        src={currentFile.file.preview}
                        autoPlay
                        muted
                        ref={videoCaptureRef}
                        style={{ width: '0px', opacity: 0, position: 'absolute', pointerEvents: 'none' }}
                        onLoadedData={(e) => {
                            setVideoDuration(e.target.duration)
                        }}
                        onPlay={(e) => {
                            handlePlayVideo(e)
                        }}
                    ></video>
                </>
            )}
            <header>
                <h1 className={cx('heading')}>Upload video</h1>
                <span className={cx('title')}>Post a video to your account</span>
            </header>
            <div className={cx('body')}>
                {captureImages.length === slideQuantity ? (
                    currentFile.file ? (
                        <MobilePreview />
                    ) : (
                        <UploadDrop small setFile={currentFile.setFile} />
                    )
                ) : currentFile.file ? (
                    <UploadDrop
                        small
                        setFile={currentFile.setFile}
                        loading
                        captureImages={captureImages}
                        setCaptureImages={setCaptureImages}
                        captureImagesRef={captureImagesRef}
                    />
                ) : (
                    <UploadDrop small setFile={currentFile.setFile} />
                )}
                <FormControl captureImages={captureImages} slideQuantity={slideQuantity}></FormControl>
            </div>
        </div>
    )
}

// Use memo to avoid re-rendering every time the file name is changed
export default memo(Preview)
