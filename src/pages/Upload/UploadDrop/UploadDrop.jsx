import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './UploadDrop.module.scss'
import { UploadVideo } from '~/Components/Icons'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const cx = classNames.bind(style)

function UploadDrop({ setFile, className, small = false }) {
    const inputRef = useRef()

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
        [className]: className,
    })

    return (
        <div className={cx(classes)}>
            <div className={cx('upload-wrapper')}>
                <label
                    htmlFor="upload-file"
                    className={cx('upload-drag')}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <UploadVideo className={cx('upload-icon')} />
                    <span className={cx('title')}>Select video to upload</span>
                    <span className={cx('drag-video')}>Or drag and drop video</span>
                    <div className={cx('video-info')}>
                        <span>MP4 or WebM</span>
                        <span>720x1280 resolution or higher</span>
                        <span>Up to 10 minutes</span>
                        <span>Less than 10GB</span>
                    </div>
                    <label htmlFor="upload-file" className={cx('upload-button')}>
                        Select file
                    </label>
                    <input
                        ref={inputRef}
                        accept="video/mp4, video/webm"
                        className={cx('file-upload')}
                        id="upload-file"
                        type="file"
                        hidden
                        onChange={handleChoseFile}
                    />
                </label>
            </div>
        </div>
    )
}

UploadDrop.propTypes = {
    setFile: PropTypes.func.isRequired,
    className: PropTypes.string,
}

export default UploadDrop
