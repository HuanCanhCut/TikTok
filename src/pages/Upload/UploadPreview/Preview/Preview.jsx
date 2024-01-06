import classNames from 'classnames/bind'
import style from './Preview.module.scss'
import MobilePreview from '../MobilePreview'
import UploadDrop from '../../UploadDrop'
import { useContext } from 'react'
import { fileUploadContext } from '../../Upload'

const cx = classNames.bind(style)

function Preview() {
    const currentFile = useContext(fileUploadContext)
    console.log(currentFile.file)

    return (
        <div className={cx('wrapper')}>
            <header>
                <h1 className={cx('heding')}>Upload video</h1>
                <span className={cx('title')}>Post a video to your account</span>
            </header>
            <div className={cx('body')}>
                {currentFile.file ? <MobilePreview /> : <UploadDrop small setFile={currentFile.setFile} />}
            </div>
        </div>
    )
}

export default Preview
