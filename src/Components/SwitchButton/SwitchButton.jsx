import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './SwitchButton.module.scss'
import { motion } from 'framer-motion'

const cx = classNames.bind(style)

function SwitchButton({ isOn, onClick, className, ...props }) {
    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
    }

    const classes = cx('switch', {
        [className]: className,
    })

    return (
        <span className={classes} onClick={onClick} data-ison={isOn} {...props}>
            <motion.span className={cx('switch-core')} layout transition={spring}></motion.span>
        </span>
    )
}

SwitchButton.propTypes = {
    isOn: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
}

export default SwitchButton
