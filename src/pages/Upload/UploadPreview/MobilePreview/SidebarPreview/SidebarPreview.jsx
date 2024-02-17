import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './SidebarPreview.module.scss'
import { useContext } from 'react'
import { currentUserData } from '~/App'
import Image from '~/Components/Images/Image'
import { MobileBarIcons } from '~/Components/Icons'

const cx = classNames.bind(style)

function SidebarPreview({ isPlay }) {
    const currentUser = useContext(currentUserData)

    return (
        <div className={cx('wrapper')}>
            <Image className={cx('user-avatar')} src={currentUser.data.avatar} alt="avatar" />
            <MobileBarIcons className={cx('mobile-bar')} />
            <div
                className={cx('user-avatar-rotate', {
                    'rotate-animation-paused': !isPlay,
                })}
            >
                <Image className={cx('rotate-item')} src={currentUser.data.avatar} alt="avatar" />
            </div>
        </div>
    )
}

SidebarPreview.propTypes = {
    isPlay: PropTypes.bool,
}

export default SidebarPreview
