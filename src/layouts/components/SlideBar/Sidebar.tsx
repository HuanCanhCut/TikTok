import classNames from 'classnames/bind'
import { memo } from 'react'

import styles from './Sidebar.module.scss'
import Menu, { MenuItem } from './Menu'
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/Components/Icons'
import SuggestedAccount from './SuggestedAccounts/SuggesteAccounts'
import FrameLoginSidebar from './FrameLoginSidebar'
import FooterSidebar from './FooterSidebar'
import config from '~/config'
import useDarkMode from '~/hooks/useDarkMode'
import { useSelector } from 'react-redux'
import { authCurrentUser } from '~/redux/selectors'

const cx = classNames.bind(styles)

function Sidebar() {
    const currentUser = useSelector(authCurrentUser)
    return (
        <aside
            className={cx('wrapper', {
                darkMode: useDarkMode(),
            })}
        >
            <div className={cx('container')}>
                <Menu>
                    <MenuItem
                        title="For You"
                        to={config.routes.home}
                        icon={<HomeIcon />}
                        activeIcon={<HomeActiveIcon />}
                    />
                    <MenuItem
                        title="Following"
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                    />
                    <MenuItem
                        title="LIVE"
                        to={config.routes.live}
                        icon={<LiveIcon />}
                        activeIcon={<LiveActiveIcon />}
                    />
                </Menu>
                {currentUser ? <SuggestedAccount label="Suggested Accounts" /> : <FrameLoginSidebar />}
                <FooterSidebar />
            </div>
        </aside>
    )
}

export default memo(Sidebar)
