import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './MobilePreview.module.scss'

import images from '~/assets/images'
import Image from '~/Components/Images/Image'
import { MobileLive, MobileSearch } from '../../../../Components/Icons'
import VideoPreview from './VideoPreview'
import ChangeVideo from './ChangeVideo'

const cx = classNames.bind(style)

function MobilePreview() {
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

MobilePreview.propType = {
    setCaptureImages: PropTypes.func,
    captureImagesRef: PropTypes.node,
    setIsIntervalActive: PropTypes.func,
}

export default MobilePreview
