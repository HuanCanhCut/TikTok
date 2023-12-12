import classNames from 'classnames/bind'
import style from './UploadDrop.module.scss'
import { UploadVideo } from '~/Components/Icons'
import { useRef } from 'react'

const cx = classNames.bind(style)

function UploadDrop({ handleDrop, showToast, setFile }) {
    const inputRef = useRef()

    const handleDragOver = (e) => {
        e.preventDefault()
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

    return (
        <div className={cx('upload-wrapper')}>
            <label htmlFor="upload-file" className={cx('upload-drag')} onDrop={handleDrop} onDragOver={handleDragOver}>
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
                    className={cx('file-upload')}
                    id="upload-file"
                    type="file"
                    hidden
                    onChange={handleChoseFile}
                />
            </label>
        </div>
    )
}

export default UploadDrop
