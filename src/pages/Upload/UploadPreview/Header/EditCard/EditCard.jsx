import classNames from 'classnames/bind'
import { useContext } from 'react'
import { fileUploadContext } from '~/pages/Upload/Upload'
import style from './EditCard.module.scss'
import Button from '~/Components/Button'
import { Cut } from '~/Components/Icons'

const cx = classNames.bind(style)

function EditCard() {
    console.log('re-render')
    const { file } = useContext(fileUploadContext)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-info')}>
                <div className={cx('video-index')}>
                    <span className={cx('index-item')}>1</span>
                </div>

                <div className={cx('video-basic')}>
                    <span className={cx('caption')}>{file.name}</span>
                </div>
            </div>
            <div className={cx('action-btn')}>
                <Button primary leftIcon={<Cut />} className={cx('edit-video')}>
                    Edit video
                </Button>
            </div>
        </div>
    )
}

export default EditCard
