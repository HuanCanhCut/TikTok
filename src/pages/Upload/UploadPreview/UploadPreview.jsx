import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './UploadPreview.module.scss'
import Header from './Header'
import Preview from './Preview'

const cx = classNames.bind(style)

function UploadPreview({ file }) {
    return (
        <div className={cx('wrapper')}>
            {file && <Header />}
            <Preview />
        </div>
    )
}

UploadPreview.propTypes = {
    file: PropTypes.node,
}

export default UploadPreview
