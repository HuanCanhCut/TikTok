import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './VideoActionItem.module.scss'
import { memo } from 'react'

const cx = classNames.bind(style)

function VideoActionItem({ icon, className, value = 0, handleClick }) {
    return (
        <>
            <button className={cx('wrapper', className)} onClick={handleClick}>
                {icon}
            </button>
            <strong className={cx('value')}>{value}</strong>
        </>
    )
}

VideoActionItem.propTypes = {
    icon: PropTypes.node.isRequired,
    value: PropTypes.node,
    handleClick: PropTypes.func.isRequired,
}

export default memo(VideoActionItem)
