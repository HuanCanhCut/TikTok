import classNames from 'classnames/bind'
import style from './ChangeVideo.module.scss'
import { useTranslation } from 'react-i18next'

import { useContext, useState, useCallback } from 'react'
import { fileNameContext, fileNameContextModal } from '../../UploadPreview'
import BlueTick from '~/Components/BlueTick/BlueTick'
import Button from '~/Components/Button'
import Modal from '~/Components/Modal'
import { sendEvent } from '~/helpers/event'
import Discard from '../../Discard'

const cx = classNames.bind(style)

const modal = {
    title: 'replace this video',
    description: 'change video description',
    allowTitle: 'change',
    cancelTitle: 'cancel',
}

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
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <Discard modal={modal} handleDiscard={confirmChange} closeModal={closeModal} vertical={true} />
            </Modal>
        </div>
    )
}

export default ChangeVideo
