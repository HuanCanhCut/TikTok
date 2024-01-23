import PropTypes from 'prop-types'
import style from './UploadDrop.module.scss'
import classNames from 'classnames/bind'
import { useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UploadVideo } from '~/Components/Icons'

const cx = classNames.bind(style)

function UploadDrop({
    setFile,
    className,
    small = false,
    loading = false,
    captureImages,
    setCaptureImages,
    captureImagesRef,
}) {
    const inputRef = useRef()
    const progressRef = useRef(null)
    const progressValueRef = useRef(null)

    // load loading effect
    useEffect(() => {
        if (captureImages && captureImages.length > 0) {
            const progressPercent = 100 - 100 / captureImages.length

            const dashArrayValue = Number(
                getComputedStyle(progressRef.current)
                    .getPropertyValue('stroke-dasharray')
                    .split(',')[0]
                    .replace('px', '')
            )

            const progressValue = (dashArrayValue * (100 - progressPercent)) / 100

            progressRef.current.style.strokeDashoffset = progressValue
            progressValueRef.current.innerText = `${progressPercent.toFixed(0)}%`
        }
    }, [captureImages])

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const showToast = (message) => {
        return toast.error(message, {
            className: 'custom-toast',
            position: 'top-center',
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        })
    }

    const handleSetFile = (e) => {
        if (Array.from(e.dataTransfer.files).length > 1) {
            showToast('Please select only one file.')
        } else {
            const fileType = Array.from(e.dataTransfer.files)[0].type
            if (fileType === 'video/mp4' || fileType === 'video/webm') {
                setFile(Array.from(e.dataTransfer.files)[0])
            } else {
                showToast('Unsupported file. Use Mp4 or WebM instead.')
            }
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()

        if (loading) {
            return
        }

        handleSetFile(e)
    }

    const handleChoseFile = (e) => {
        const fileType = Array.from(e.target.files)[0].type
        if (fileType === 'video/mp4' || fileType === 'video/webm') {
            setFile(Array.from(e.target.files)[0])
        } else {
            showToast('Unsupported file. Use Mp4 or WebM instead.')
            inputRef.current.value = null
        }
    }

    const classes = cx('wrapper', {
        small,
        loading,
        [className]: className,
    })

    const handleCancel = () => {
        // when click cancel button
        if (loading) {
            setFile(null)
            setCaptureImages([])
            captureImagesRef.current.forEach((url) => {
                URL.revokeObjectURL(url)
            })
            return
        }
    }

    return (
        <div className={cx(classes)}>
            <div className={cx('upload-wrapper')}>
                <div
                    className={cx('upload-drag')}
                    onClick={() => {
                        if (!loading) {
                            inputRef.current.click()
                        }
                    }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {loading ? (
                        <div className={cx('loading-wrapper')}>
                            <svg viewBox="0 0 100 100" size="64" className={cx('loading')}>
                                <circle className={cx('circle')} cx={50} cy={50} r={46.875}></circle>
                                <circle
                                    ref={progressRef}
                                    className={cx('circle-progress')}
                                    cx={50}
                                    cy={50}
                                    r={46.875}
                                ></circle>
                            </svg>
                            <div ref={progressValueRef} className={cx('loading-value')}>
                                0%
                            </div>
                        </div>
                    ) : (
                        <>
                            <UploadVideo className={cx('upload-icon')} />
                            <span className={cx('title')}>Select video to upload</span>
                            <span className={cx('drag-video')}>Or drag and drop video</span>
                            <div className={cx('video-info')}>
                                <span>MP4 or WebM</span>
                                <span>720x1280 resolution or higher</span>
                                <span>Up to 10 minutes</span>
                                <span>Less than 10GB</span>
                            </div>

                            <input
                                ref={inputRef}
                                accept="video/mp4, video/webm"
                                className={cx('file-upload')}
                                id="upload-file"
                                type="file"
                                hidden
                                onChange={handleChoseFile}
                            />
                        </>
                    )}
                    <div onClick={handleCancel} className={cx('upload-button')}>
                        {loading ? 'Cancel' : 'Select file'}
                    </div>
                </div>
            </div>
        </div>
    )
}

UploadDrop.propTypes = {
    setFile: PropTypes.func.isRequired,
    className: PropTypes.string,
    captureImages: PropTypes.array,
    setCaptureImages: PropTypes.func,
}

export default UploadDrop
