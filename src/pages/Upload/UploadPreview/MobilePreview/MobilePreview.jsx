import classNames from 'classnames/bind'
import style from './MobilePreview.module.scss'
import { useContext, useEffect } from 'react'
import { fileUploadContext } from '~/pages/Upload/Upload'

import images from '~/assets/images'
import Image from '~/Components/Images/Image'
import { MobileLive, MobileSearch } from '../../../../Components/Icons'
import VideoPreview from './VideoPreview'
import ChangeVideo from './ChangeVideo'

const cx = classNames.bind(style)

function MobilePreview() {
    const currentFile = useContext(fileUploadContext)

    currentFile.file.preview = URL.createObjectURL(currentFile.file)

    useEffect(() => {
        return () => {
            currentFile.file.preview && URL.revokeObjectURL(currentFile.file.preview)
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
            <ChangeVideo></ChangeVideo>
        </div>
    )
}

export default MobilePreview
