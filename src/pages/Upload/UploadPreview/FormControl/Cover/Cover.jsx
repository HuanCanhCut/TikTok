import classNames from 'classnames/bind'
import style from './Cover.module.scss'
import { useRef, useContext, useState, useEffect } from 'react'
import Tippy from '@tippyjs/react'
import useDarkMode from '~/hooks/useDarkMode'

import { fileUploadContext } from '~/pages/Upload/Upload'
import { CircleInfo } from '~/Components/Icons'

const cx = classNames.bind(style)

const durationFinished = 3
const slideQuantity = 8

function Cover() {
    const { file } = useContext(fileUploadContext)

    const [captureImages, setCaptureImages] = useState([])
    const [isIntervalActive, setIsIntervalActive] = useState(true)
    const [videoDuration, setVideoDuration] = useState()

    const sliderRef = useRef(null)
    const thumbRef = useRef(null)
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const videoCaptureRef = useRef(null)
    const intervalRef = useRef(null)
    const captureImagesRef = useRef(captureImages)

    const startDrag = (e) => {
        e.preventDefault()

        if (!sliderRef.current && !thumbRef.current) {
            return
        }

        const sliderRect = sliderRef.current.getBoundingClientRect()

        const dragMove = (e) => {
            // handle drag thumb
            const position = (e.clientX - thumbRef.current.offsetWidth / 2 - sliderRect.left) / sliderRect.width
            const horizontalRatio = 1 - thumbRef.current.offsetWidth / sliderRef.current.offsetWidth
            const clampedPosition = Math.min(horizontalRatio, Math.max(0, position))

            thumbRef.current.style.left = `${clampedPosition * 100}%`

            // Handles the current time of the video
            const duration = videoRef.current.duration
            const progress =
                (Number(thumbRef.current.style.left.toString().replace('%', '')) / 100 / horizontalRatio) * 100
            const sweek = (duration / 100) * progress
            videoRef.current.currentTime = sweek
        }

        const dragEnd = () => {
            window.removeEventListener('mousemove', dragMove)
            window.removeEventListener('mouseup', dragEnd)
        }

        window.addEventListener('mousemove', dragMove)
        window.addEventListener('mouseup', dragEnd)
    }

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth
            canvasRef.current.height = videoRef.current.videoHeight

            canvasRef.current
                .getContext('2d')
                .drawImage(videoCaptureRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

            canvasRef.current.toBlob((blob) => {
                const blobImg = URL.createObjectURL(blob)
                setCaptureImages((prev) => [...prev, blobImg])
            })
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
        const handleSpeedVideo = (e) => {
            if (e.target.duration) {
                // playbackRate rate limit is 16
                e.target.playbackRate = Math.min(16, e.target.duration / durationFinished)
            }
        }

        if (videoCaptureRef.current) {
            videoCaptureRef.current.addEventListener('play', handleSpeedVideo)
        }
    }, [videoCaptureRef])

    useEffect(() => {
        if (captureImages.length >= slideQuantity) {
            setIsIntervalActive(false)
        }
    }, [captureImages.length])

    useEffect(() => {
        if (isIntervalActive) {
            intervalRef.current = setInterval(() => {
                //readyState === 4 : the data is enough to be transmitted to the final medium without interruption.
                if (videoCaptureRef.current && videoCaptureRef.current.readyState === 4) {
                    handleCapture()
                }
            }, (durationFinished / slideQuantity) * 1000)
        }

        return () => {
            clearInterval(intervalRef.current)
        }
    }, [isIntervalActive, videoDuration, captureImages])

    return (
        <>
            <div className={cx('cover')}>
                <span className={cx('title')}>Cover</span>
                <Tippy
                    content={`Select a cover or upload one from your device. An engaging cover can effectively capture viewers’ interest.`}
                    placement="bottom-start"
                    interactive
                >
                    <div className={cx('circle-icon')}>
                        <CircleInfo />
                    </div>
                </Tippy>
            </div>
            <canvas ref={canvasRef} id={cx('canvas')} tabIndex={-1}></canvas>
            <video
                src={file.preview}
                autoPlay
                muted
                ref={videoCaptureRef}
                style={{ width: '0px' }}
                onLoadedData={(e) => {
                    setVideoDuration(e.target.duration)
                }}
            ></video>
            <div
                className={cx('cover-frame', {
                    darkMode: useDarkMode(),
                })}
                ref={sliderRef}
            >
                {captureImages.map((item, index) => {
                    return (
                        <img
                            src={item}
                            alt=""
                            key={index}
                            className={cx('capture-image')}
                            style={{ maxWidth: `${100 / slideQuantity}%` }}
                        />
                    )
                })}
                <div className={cx('cover-thumb')} onMouseDown={startDrag} ref={thumbRef}>
                    <video src={file.preview} className={cx('video')} ref={videoRef}></video>
                </div>
            </div>
            {/* <svg viewBox="0 0 100 100" size="64" class="css-139qz6k">
                <circle class="css-7wl6rs"></circle>
                <circle class="css-1cnljbw"></circle>
            </svg> */}
        </>
    )
}

export default Cover
