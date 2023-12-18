import classNames from 'classnames/bind'
import style from './UploadPreview.module.scss'
import Header from './Header'
import Preview from './Preview'

const cx = classNames.bind(style)

function UploadPreview() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Preview />
        </div>
    )
}

export default UploadPreview
