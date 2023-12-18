import classNames from 'classnames/bind'
import style from './MobilePreview.module.scss'
import images from '~/assets/images'
import Image from '~/Components/Images/Image'
import BlueTick from '../BlueTick/BlueTick'
import Button from '../Button'

const cx = classNames.bind(style)

function MobilePreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('mobile-container')}>
                <Image src={images.mobilePreview} className={cx('preview-img')} />
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
