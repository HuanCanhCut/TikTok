import classNames from 'classnames/bind'
import style from './UploadPreview.module.scss'
import Header from './Header'

const cx = classNames.bind(style)

function UploadPreview() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container-body')}></div>
        </div>
    )
}

export default UploadPreview
