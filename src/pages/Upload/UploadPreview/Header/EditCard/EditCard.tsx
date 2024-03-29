import classNames from 'classnames/bind'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import style from './EditCard.module.scss'
import Button from '~/Components/Button'
import { Cut } from '~/Components/Icons'
import { fileNameContext } from '../../UploadPreview'

const cx = classNames.bind(style)

function EditCard() {
    const { t } = useTranslation()

    const fileName = useContext(fileNameContext)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-info')}>
                <div className={cx('video-index')}>
                    <span className={cx('index-item')}>1</span>
                </div>

                <div className={cx('video-basic')}>
                    <span className={cx('caption')}>{fileName?.fileName}</span>
                </div>
            </div>
            <Button primary leftIcon={<Cut />} className={cx('edit-video')}>
                {t('upload.preview.edit video')}
            </Button>
        </div>
    )
}

export default EditCard
