import { memo, useState, useCallback } from 'react'
import classNames from 'classnames/bind'
import Modal from 'react-modal'

import images from '~/assets/images'
import Video from '~/layouts/components/Video'
import style from './Home.module.scss'
import Notification from '~/Components/Notification'

const cx = classNames.bind(style)

function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(JSON.parse(localStorage.getItem('firstNotification')) ?? true)

    const closeModal = useCallback(() => {
        localStorage.setItem('firstNotification', JSON.stringify(false))
        setModalIsOpen(false)
    }, [])

    const notificationProps = {
        title: 'Hello, Admin đây!',
        content:
            'Chuyện kể rằng, do chính sách của google tắt mọi âm thanh tự phát khi mà chưa có tương tác của người dùng, mà admin lại chưa nghĩ ra ý tưởng để pass qua cái đó, nên admin quyết định làm cái thông báo này để người dùng tương tác trước, mong thí chủ thông cảm cho Admin.',
        path: images.notificationCat,
    }

    return (
        <>
            {modalIsOpen ? (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    overlayClassName={cx('overlay')}
                    ariaHideApp={false}
                    className={cx('modal')}
                >
                    <Notification
                        closeModal={closeModal}
                        content={notificationProps.content}
                        title={notificationProps.title}
                        path={notificationProps.path}
                    />
                </Modal>
            ) : (
                <div className={cx('wrapper')}>
                    <Video type="for-you" />
                </div>
            )}
        </>
    )
}

export default memo(Home)
