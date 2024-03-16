import classNames from 'classnames/bind'
import style from './FrameLoginSidebar.module.scss'
import Button from '~/Components/Button'
import { sendEvent } from '~/helpers/event'

const cx = classNames.bind(style)

function FrameLoginSidebar() {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Log in to follow creators, like videos, and view comments.</p>
            <Button
                outline
                className={cx('login')}
                onClick={() => {
                    sendEvent({ eventName: 'auth:open-auth-modal', detail: true })
                }}
            >
                Login
            </Button>
        </div>
    )
}

export default FrameLoginSidebar
