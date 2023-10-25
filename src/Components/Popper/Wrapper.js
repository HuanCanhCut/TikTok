import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './Popper.module.scss'

const cx = classNames.bind(style)

function Wrapper({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
}

export default Wrapper
