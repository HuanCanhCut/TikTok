import classNames from 'classnames/bind'
import style from './MobilePreview.module.scss'
import { useContext, useEffect } from 'react'
import { fileUploadContext } from '~/pages/Upload/Upload'

import images from '~/assets/images'
import Image from '~/Components/Images/Image'
import BlueTick from '../../../../Components/BlueTick/BlueTick'
import Button from '../../../../Components/Button'
import { MobileLive, MobileSearch } from '../../../../Components/Icons'
import VideoPreview from './VideoPreview'

const cx = classNames.bind(style)

function MobilePreview() {
    const currentFile = useContext(fileUploadContext)

    currentFile.file.preview = URL.createObjectURL(currentFile.file)

    useEffect(() => {
        return () => {
            currentFile.file.preview && URL.revokeObjectURL(currentFile.file)
        }
    }, [currentFile])

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
                    <span className={cx('description')}>Watch trending videos for you _ TikTok</span>
                </div>
                <Button text className={cx('change-video-btn')}>
                    Change video
                </Button>
            </div>
        </div>
    )
}

export default MobilePreview
