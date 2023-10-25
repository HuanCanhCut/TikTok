import { useState } from 'react'
import classNames from 'classnames/bind'
import style from './FrameLoginSidebar.module.scss'
import Button from '~/Components/Button'
import Authen from '~/layouts/components/Authen'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function FrameLoginSidebar() {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }
    return (
        <div
            className={cx('wrapper', {
                darkMode: useDarkMode(),
            })}
        >
            <p className={cx('title')}>Log in to follow creators, like videos, and view comments.</p>
            <Button rounded className={cx('login')} onClick={openModal}>
                Login
            </Button>
            <Authen isOpen={modalIsOpen} onClose={closeModal} />
        </div>
    )
}

export default FrameLoginSidebar
