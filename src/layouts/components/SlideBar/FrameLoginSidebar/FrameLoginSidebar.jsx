import { useState, useCallback } from 'react'
import classNames from 'classnames/bind'
import style from './FrameLoginSidebar.module.scss'
import Button from '~/Components/Button'
import Authen from '~/layouts/components/Authen'

const cx = classNames.bind(style)

function FrameLoginSidebar() {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const openModal = useCallback(() => {
        setModalIsOpen(true)
    }, [])

    const closeModal = () => {
        setModalIsOpen(false)
    }
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Log in to follow creators, like videos, and view comments.</p>
            <Button outline className={cx('login')} onClick={openModal}>
                Login
            </Button>
            <Authen isOpen={modalIsOpen} onClose={closeModal} />
        </div>
    )
}

export default FrameLoginSidebar
