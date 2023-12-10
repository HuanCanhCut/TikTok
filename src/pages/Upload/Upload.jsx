import classNames from 'classnames/bind'
import style from './Upload.module.scss'
import { memo } from 'react'
import { UploadVideo } from '~/Components/Icons'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function Upload() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload-wrapper')}>
                <div
                    className={cx('upload-drag', {
                        darkMode: useDarkMode(),
                    })}
                >
                    <input className={cx('file-upload')} id="upload-file" type="file" />
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
                </div>
            </div>
        </div>
    )
}

export default memo(Upload)
