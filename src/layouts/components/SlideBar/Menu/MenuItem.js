import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import style from './Menu.module.scss'
import classNames from 'classnames/bind'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function MenuItem({ icon, to, title, activeIcon }) {
    const classes = {
        darkMode: useDarkMode(),
    }

    return (
        <NavLink
            className={(nav) => {
                return cx('menu-item', {
                    active: nav.isActive,
                    ...classes,
                })
            }}
            to={to}
        >
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    )
}

MenuItem.propTypes = {
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default MenuItem
