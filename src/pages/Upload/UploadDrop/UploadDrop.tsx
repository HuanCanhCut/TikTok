import style from './UploadDrop.module.scss'
import classNames from 'classnames/bind'
import React, { useRef, useEffect } from 'react'
import { UploadVideo } from '~/Components/Icons'
import { sendEvent } from '~/helpers/event'
import { showToast } from '~/project/services'

const cx = classNames.bind(style)

interface Props {
    setFile: any
    className?: any
    small?: boolean
    loading?: boolean
    captureImages?: string[]
}

const UploadDrop: React.FC<Props> = ({ setFile, className, small = false, loading = false, captureImages }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const progressRef: any = useRef<SVGCircleElement>(null)
    const progressValueRef = useRef<HTMLDivElement>(null)

    // load loading effect
    useEffect(() => {
        if (captureImages && captureImages.length > 0) {
            const progressPercent = 100 - 100 / captureImages.length

            if (progressRef.current && progressValueRef.current) {
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
        }
    }, [captureImages])

    const handleDragOver = (e: any) => {
        e.preventDefault()
    }

    const handleSetFile = (e: any) => {
        if (Array.from(e.dataTransfer.files).length > 1) {
            showToast({ message: 'Please select only one file.' })
        } else {
            const fileType = e.dataTransfer.files[0].type
            if (fileType === 'video/mp4' || fileType === 'video/webm') {
                setFile(e.dataTransfer.files[0])
            } else {
                showToast({ message: 'Unsupported file. Use Mp4 or WebM instead.' })
            }
        }
    }

    const handleDrop = (e: any) => {
        e.preventDefault()

        if (loading) {
            return
        }

        handleSetFile(e)
    }

    const handleChoseFile = (e: any) => {
        const fileType = e.target.files[0].type
        if (fileType === 'video/mp4' || fileType === 'video/webm') {
            setFile(e.target.files[0])
        } else {
            showToast({ message: 'Unsupported file. Use Mp4 or WebM instead.' })
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
            sendEvent({ eventName: 'upload:cancel-upload-file' })
        }
    }

    return (
        <div className={cx(classes)}>
            <div className={cx('upload-wrapper')}>
                <div
                    className={cx('upload-drag')}
                    onClick={() => {
                        if (!loading) {
                            inputRef.current && inputRef.current.click()
                        }
                    }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {loading ? (
                        <div className={cx('loading-wrapper')}>
                            <svg viewBox="0 0 100 100" className={cx('loading')}>
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

export default UploadDrop
