import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import style from './Menu.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

function MenuItem({ icon, to, title, activeIcon }) {
    return (
        <NavLink
            className={(nav) => {
                return cx('menu-item', {
                    active: nav.isActive,
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
