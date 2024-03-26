import classNames from 'classnames/bind'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

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
import SuggestedAccount from './SuggestedAccounts/SuggestedAccounts'
import FrameLoginSidebar from './FrameLoginSidebar'
import FooterSidebar from './FooterSidebar'
import config from '~/config'
import useDarkMode from '~/hooks/useDarkMode'
import { useSelector } from 'react-redux'
import { authCurrentUser } from '~/redux/selectors'

const cx = classNames.bind(styles)

function Sidebar() {
    const { t } = useTranslation()
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
                        title={t('sidebar.for you')}
                        to={config.routes.home}
                        icon={<HomeIcon />}
                        activeIcon={<HomeActiveIcon />}
                    />
                    <MenuItem
                        title={t('sidebar.following')}
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                        type="following"
                    />
                    <MenuItem
                        title="LIVE"
                        to={config.routes.live}
                        icon={<LiveIcon />}
                        activeIcon={<LiveActiveIcon />}
                    />
                </Menu>
                {currentUser ? <SuggestedAccount label={t('sidebar.suggested accounts')} /> : <FrameLoginSidebar />}
                <FooterSidebar />
            </div>
        </aside>
    )
}

export default memo(Sidebar)
