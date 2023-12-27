import classNames from 'classnames/bind'
import style from './Preview.module.scss'
import MobilePreview from '../MobilePreview'

const cx = classNames.bind(style)

function Preview() {
    return (
        <div className={cx('wrapper')}>
            <header>
                <h1 className={cx('heding')}>Upload video</h1>
                <span className={cx('title')}>Post a video to your account</span>
            </header>
            <div className={cx('body')}>
                <MobilePreview />
            </div>
        </div>
    )
}

export default Preview
