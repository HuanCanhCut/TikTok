import classNames from 'classnames/bind'
import style from './Preview.module.scss'
import { useContext, memo } from 'react'

import MobilePreview from '../MobilePreview'
import UploadDrop from '../../UploadDrop'
import { fileUploadContext } from '../../Upload'
import FormControl from '../FormControl'

const cx = classNames.bind(style)

function Preview() {
    const currentFile = useContext(fileUploadContext)

    return (
        <div className={cx('wrapper')}>
            <header>
                <h1 className={cx('heading')}>Upload video</h1>
                <span className={cx('title')}>Post a video to your account</span>
            </header>
            <div className={cx('body')}>
                {currentFile.file ? <MobilePreview /> : <UploadDrop small setFile={currentFile.setFile} />}
                <FormControl></FormControl>
            </div>
        </div>
    )
}

// Use memo to avoid re-rendering every time the file name is changed
export default memo(Preview)
