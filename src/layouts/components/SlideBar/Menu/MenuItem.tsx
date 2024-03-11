import { NavLink, To } from 'react-router-dom'
import style from './Menu.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

interface Props {
    icon: React.ReactNode
    to: To
    title: string
    activeIcon: React.ReactNode
}

const MenuItem: React.FC<Props> = ({ icon, to, title, activeIcon }) => {
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

export default MenuItem
