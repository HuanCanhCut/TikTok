import classNames from 'classnames/bind'
import style from './MobilePreview.module.scss'
import { useContext, useCallback, useState } from 'react'

import { fileUploadContext } from '~/pages/Upload/Upload'
import { fileNameContext } from '../UploadPreview'
import images from '~/assets/images'
import Image from '~/Components/Images/Image'
import { MobileLive, MobileSearch } from '../../../../Components/Icons'
import VideoPreview from './VideoPreview'
import BlueTick from '~/Components/BlueTick/BlueTick'
import Button from '~/Components/Button'
import Modal from '~/Components/Modal'

const cx = classNames.bind(style)

function MobilePreview({ setCaptureImages, captureImagesRef, setIsIntervalActive }) {
    const currentFile = useContext(fileUploadContext)
    const { fileName } = useContext(fileNameContext)

    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const confirmChange = useCallback(() => {
        currentFile.setFile(null)
        setCaptureImages([])
        setIsIntervalActive(true)
        captureImagesRef.current.forEach((url) => {
            URL.revokeObjectURL(url)
        })
        closeModal()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('mobile-container')}>
                <div className={cx('mobile-page-layout')} tabIndex={-1}>
                    <MobileLive className={cx('page-icon')} tabIndex={-1} />
                    <div className={cx('tab-title')} tabIndex={-1}>
                        <span className={cx('following')}>Following</span>
                        <span className={cx('for-you')}>For-you</span>
                    </div>
                    <MobileSearch className={cx('page-icon')} tabIndex={-1} />
                </div>
                <Image src={images.mobilePreview} className={cx('preview-img')} />
                <Image src={images.appTab} className={cx('app-tab')}></Image>
                <VideoPreview />
            </div>
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
        </div>
    )
}

export default MobilePreview
