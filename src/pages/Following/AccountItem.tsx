import classNames from 'classnames/bind'
import style from './Following.module.scss'
import Button from '~/Components/Button'
import Image from '~/Components/Images/Image'
import { VideoModal } from '~/modal/modal'
import BlueTick from '~/Components/BlueTick/BlueTick'
import { sendEvent } from '~/helpers/event'
import { Link } from 'react-router-dom'

const cx = classNames.bind(style)

interface Props {
    item: VideoModal
    onVideoHover: (video: HTMLVideoElement) => void
}

const AccountItem: React.FC<Props> = ({ item, onVideoHover }) => {
    const handleMouseOver = async (e: any) => {
        const currentVideo = e.target
        onVideoHover(currentVideo)
        if (currentVideo) {
            try {
                currentVideo.currentTime = 0
                await currentVideo.play()
            } catch (e) {}
        }
    }

    const handleFollow = () => {
        sendEvent({ eventName: 'auth:open-auth-modal', detail: true })
    }

    return (
        <div className={cx('account-item')}>
            <Link to={`/user/@${item.user.nickname}`}>
                <video src={item.file_url} className={cx('video')} onMouseOver={handleMouseOver} muted></video>
                <div className={cx('info')}>
                    <Image src={item.user.avatar} className={cx('avatar')} />
                    <h3>{`${item.user.first_name} ${item.user.last_name}`}</h3>
                    <div className={cx('nickname')}>
                        <h4 style={{ fontWeight: 500, padding: '4px 0' }}>{item.user.nickname} </h4>
                        {item.user.tick && <BlueTick></BlueTick>}
                    </div>
                </div>
            </Link>
            <Button className={cx('follow-btn')} primary onClick={handleFollow}>
                Follow
            </Button>
        </div>
    )
}

export default AccountItem
