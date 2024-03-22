import classNames from 'classnames/bind'
import style from './ChangeVideo.module.scss'
import { useTranslation } from 'react-i18next'

import { useContext, useState, useCallback } from 'react'
import { fileNameContext, fileNameContextModal } from '../../UploadPreview'
import BlueTick from '~/Components/BlueTick/BlueTick'
import Button from '~/Components/Button'
import Modal from '~/Components/Modal'
import { sendEvent } from '~/helpers/event'

const cx = classNames.bind(style)

function ChangeVideo() {
    const { t } = useTranslation()

    const fileNameModal: fileNameContextModal | null = useContext(fileNameContext)

    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const confirmChange = useCallback(() => {
        sendEvent({ eventName: 'upload:cancel-upload-file' })
        closeModal()
    }, [])
    return (
        <div className={cx('change-video')}>
            <div className={cx('change-text')}>
                <BlueTick className={cx('check-icon')} />
                <span className={cx('description')}>{fileNameModal?.fileName}</span>
            </div>
            <Button text className={cx('change-video-btn')} onClick={openModal}>
                {t('upload.preview.change video')}
            </Button>
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    title={t('upload.preview.replace this video')}
                    description={t('upload.preview.change video description')}
                    allowTitle={t('upload.preview.change')}
                    cancelTitle={t('upload.preview.cancel')}
                    vertical={true}
                    onAllow={confirmChange}
                />
            )}
        </div>
    )
}

export default ChangeVideo
