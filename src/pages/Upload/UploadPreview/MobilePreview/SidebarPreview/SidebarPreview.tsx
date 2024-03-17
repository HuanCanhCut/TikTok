import classNames from 'classnames/bind'
import style from './SidebarPreview.module.scss'
import Image from '~/Components/Images/Image'
import { MobileBarIcons } from '~/Components/Icons'
import { UserModal } from '~/modal/modal'
import { useSelector } from 'react-redux'
import { authCurrentUser } from '~/redux/selectors'

const cx = classNames.bind(style)

interface Props {
    isPlay: boolean
}

const SidebarPreview: React.FC<Props> = ({ isPlay }) => {
    const currentUser: UserModal = useSelector(authCurrentUser)

    return (
        <div className={cx('wrapper')}>
            <Image className={cx('user-avatar')} src={currentUser.avatar} alt="avatar" />
            <MobileBarIcons className={cx('mobile-bar')} />
            <div
                className={cx('user-avatar-rotate', {
                    'rotate-animation-paused': !isPlay,
                })}
            >
                <Image className={cx('rotate-item')} src={currentUser.avatar} alt="avatar" />
            </div>
        </div>
    )
}

export default SidebarPreview
