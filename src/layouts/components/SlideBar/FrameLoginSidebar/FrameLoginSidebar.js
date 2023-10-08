import style from './FrameLoginSidebar.module.scss'
import classNames from 'classnames/bind'
import Button from '~/Components/Button'
import { useContext } from 'react'
import { GlobalContext } from '~/layouts/DefaultLayout/DefaultLayout'

const cx = classNames.bind(style)

function FrameLoginSidebar() {
    const handleDisplay = useContext(GlobalContext)

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Log in to follow creators, like videos, and view comments.</p>
            <Button rounded className={cx('login')} onClick={handleDisplay}>
                Login
            </Button>
        </div>
    )
}

export default FrameLoginSidebar
