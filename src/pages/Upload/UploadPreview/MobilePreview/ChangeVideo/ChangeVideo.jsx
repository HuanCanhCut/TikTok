import classNames from 'classnames/bind'
import style from './ChangeVideo.module.scss'
import BlueTick from '~/Components/BlueTick/BlueTick'
import Button from '~/Components/Button'
import Modal from '~/Components/Modal'
import { useState, useCallback, useContext } from 'react'
import { fileUploadContext } from '~/pages/Upload/Upload'
import { fileNameContext } from '../../UploadPreview'

const cx = classNames.bind(style)

function ChangeVideo() {
    const currentFile = useContext(fileUploadContext)
    const { fileName, setFileName } = useContext(fileNameContext)

    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const confirmChange = useCallback(() => {
        setFileName('')
        currentFile.setFile(null)
        closeModal()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={cx('change-video')}>
            <div className={cx('change-text')}>
                <BlueTick className={cx('check-icon')} />
                <span className={cx('description')}>{fileName}</span>
            </div>
            <Button text className={cx('change-video-btn')} onClick={openModal}>
                Change video
            </Button>
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    title="Replace this video?"
                    description="Caption and video settings will still be saved."
                    allow="Change"
                    onAllow={confirmChange}
                />
            )}
        </div>
    )
}

export default ChangeVideo
