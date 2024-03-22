import style from './UploadDrop.module.scss'
import classNames from 'classnames/bind'
import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()

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
            showToast({ message: t('upload.drop.select only file') })
        } else {
            const fileType = e.dataTransfer.files[0].type
            if (fileType === 'video/mp4' || fileType === 'video/webm') {
                setFile(e.dataTransfer.files[0])
            } else {
                showToast({ message: t('upload.drop.unsupported file') })
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
            showToast({ message: t('upload.drop.unsupported file') })
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
                            <span className={cx('title')}>{t('upload.drop.select video to upload')}</span>
                            <span className={cx('drag-video')}>{t('upload.drop.or drag and drop video')}</span>
                            <div className={cx('video-info')}>
                                <span>{t('upload.drop.mp4 or webm')}</span>
                                <span>{t('upload.drop.resolution or higher')}</span>
                                <span>{t('upload.drop.up to 10 minutes')}</span>
                                <span>{t('upload.drop.less than 10GB')}</span>
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
                        {loading ? t('upload.drop.cancel') : t('upload.drop.select file')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadDrop
