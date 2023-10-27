import { memo, useEffect, useState, useRef } from 'react'
import classNames from 'classnames/bind'
import { Virtuoso } from 'react-virtuoso'
import Modal from 'react-modal'
import images from '~/assets/images'

import style from './Home.module.scss'
import Video from '~/layouts/components/Video'
import * as videoService from '~/services/videoService'
import { GoToTop } from '~/Components/Icons'
import AccountLoading from '~/Components/AccountLoading'
import Notification from '~/Components/Notification'

const cx = classNames.bind(style)

const INIT_PAGE = Math.floor(Math.random() * 37)
function Home() {
    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(INIT_PAGE)
    const [goToTop, setGoToTop] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(JSON.parse(localStorage.getItem('firstNotification')) ?? true)
    const headerIntoview = useRef()

    const handleGoToTop = () => {
        headerIntoview.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        })
    }

    const closeModal = () => {
        localStorage.setItem('firstNotification', JSON.stringify(false))
        setModalIsOpen(false)
    }

    const notificationProps = {
        title: 'Tại sao có thông báo này',
        content:
            'Chuyện kể rằng, do chính sách của google tắt mọi âm thanh tự phát khi mà chưa có tương tác của người dùng, mà admin lại chưa nghĩ ra ý tưởng để pass qua cái đó, nên admin quyết định làm cái thông báo này để người dùng tương tác trước, thí chủ thông cảm. Cảm ơn thí chủ đã kiên nhẫn đọc',
        path: images.notificationCat,
    }

    useEffect(() => {
        ;(async () => {
            try {
                const response = await videoService.getVideo({
                    type: 'for-you',
                    page: page,
                })

                setVideos((prev) => {
                    return [...prev, ...response.data]
                })
            } catch (error) {
                console.log(error)
            }
        })()
    }, [page])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            setGoToTop(scrollTop > 10)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            {modalIsOpen || (
                <div className={cx('wrapper')}>
                    <Virtuoso
                        data={videos}
                        useWindowScroll
                        endReached={() => {
                            setPage((prev) => {
                                do {
                                    return Math.floor(Math.random() * 37)
                                } while (prev === Math.floor(Math.random() * 37))
                            })
                        }}
                        itemContent={(index, item) => {
                            return <Video key={index} data={item} />
                        }}
                        components={{
                            Header: () => {
                                return <div className={cx('header-intoview')} ref={headerIntoview}></div>
                            },
                            Footer: () => {
                                return <AccountLoading big />
                            },
                        }}
                    />
                    {goToTop && (
                        <button className={cx('go-to-top')} onClick={handleGoToTop}>
                            <GoToTop width="16px" height="16px" />
                        </button>
                    )}
                </div>
            )}
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
        </>
    )
}

export default memo(Home)
