import { memo, useEffect, useState, useCallback, useRef } from 'react'
import classNames from 'classnames/bind'
import { Virtuoso } from 'react-virtuoso'
import Modal from 'react-modal'
import images from '~/assets/images'

import style from './Home.module.scss'
import Video from '~/layouts/components/Video'
import * as videoService from '~/services/videoService'
import AccountLoading from '~/Components/AccountLoading'
import Notification from '~/Components/Notification'

const cx = classNames.bind(style)

const TOTAL_PAGES_KEY = 'totalVideoPages'
const TOTAL_PAGES_VIDEO = JSON.parse(localStorage.getItem(TOTAL_PAGES_KEY))
const INIT_PAGE = Math.floor(Math.random() * TOTAL_PAGES_VIDEO) || 1

function Home() {
    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(INIT_PAGE)
    const [focusedIndex, setFocusedIndex] = useState(0)
    const virtuosoRef = useRef()

    const [modalIsOpen, setModalIsOpen] = useState(JSON.parse(localStorage.getItem('firstNotification')) ?? true)
    const [pageIndexes, setPageIndexes] = useState(JSON.parse(localStorage.getItem('pageIndexes')) ?? [])

    const closeModal = useCallback(() => {
        localStorage.setItem('firstNotification', JSON.stringify(false))
        setModalIsOpen(false)
    }, [])

    const notificationProps = {
        title: 'Hello, Admin đây!',
        content:
            'Chuyện kể rằng, do chính sách của google tắt mọi âm thanh tự phát khi mà chưa có tương tác của người dùng, mà admin lại chưa nghĩ ra ý tưởng để pass qua cái đó, nên admin quyết định làm cái thông báo này để người dùng tương tác trước, mong thí chủ thông cảm cho Dev.',
        path: images.notificationCat,
    }

    useEffect(() => {
        ;(async () => {
            try {
                const response = await videoService.getVideo({
                    type: 'for-you',
                    page: page,
                })

                localStorage.setItem(TOTAL_PAGES_KEY, JSON.stringify(response.meta.pagination.total_pages))

                setVideos((prev) => {
                    return [...prev, ...response.data]
                })

                setPageIndexes((prev) => {
                    return [...prev, page]
                })

                localStorage.setItem('pageIndexes', JSON.stringify(pageIndexes))
            } catch (error) {
                console.log(error)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const scrollToIndex = (index) => {
        virtuosoRef.current.scrollToIndex({ index: index, align: 'center', behavior: 'smooth' })
    }

    useEffect(() => {
        const handleClickKeys = (e) => {
            if (e.key === 'ArrowDown' && focusedIndex < videos.length - 1) {
                e.preventDefault()
                const nextIndex = focusedIndex + 1
                setFocusedIndex(nextIndex)
                scrollToIndex(nextIndex)
            }

            if (e.key === 'ArrowUp' && focusedIndex !== 0) {
                e.preventDefault()
                const prevIndex = focusedIndex - 1
                setFocusedIndex(prevIndex)
                scrollToIndex(prevIndex)
            }
        }

        window.addEventListener('keydown', handleClickKeys)

        return () => {
            window.removeEventListener('keydown', handleClickKeys)
        }
    }, [focusedIndex, videos.length])

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
                <div className={cx('wrapper')} tabIndex={10}>
                    <Virtuoso
                        ref={virtuosoRef}
                        data={videos}
                        useWindowScroll
                        endReached={() => {
                            setPage(() => {
                                do {
                                    return Math.floor(Math.random() * TOTAL_PAGES_VIDEO)
                                } while (pageIndexes.includes(Math.floor(Math.random() * TOTAL_PAGES_VIDEO)))
                            })
                        }}
                        itemContent={(index, item) => {
                            return <Video key={index} data={item} />
                        }}
                        components={{
                            Footer: () => {
                                return <AccountLoading big />
                            },
                        }}
                    />
                </div>
            )}
        </>
    )
}

export default memo(Home)
