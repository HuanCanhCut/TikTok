import { memo, useEffect, useState, useCallback, useRef, useContext, createContext } from 'react'
import classNames from 'classnames/bind'
import Modal from 'react-modal'
import images from '~/assets/images'
import { currentUserData } from '~/App'
import { Virtuoso } from 'react-virtuoso'
import { useDispatch } from 'react-redux'
import { actions } from '~/redux'

import AccountLoading from '~/Components/AccountLoading'
import style from './Home.module.scss'
import Video from '~/layouts/components/Video'
import * as videoService from '~/services/videoService'
import Notification from '~/Components/Notification'

export const updateContext = createContext()

const cx = classNames.bind(style)

const TOTAL_PAGES_KEY = 'totalVideoPages'
const TOTAL_PAGES_VIDEO = JSON.parse(localStorage.getItem(TOTAL_PAGES_KEY))
const INIT_PAGE = Math.floor(Math.random() * TOTAL_PAGES_VIDEO) || 1

function Home() {
    const dispatch = useDispatch()
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(INIT_PAGE)
    const [followed, setFollowed] = useState([])
    const [unFollowed, setUnFollowed] = useState([])
    const [focusedIndex, setFocusedIndex] = useState(0)
    const virtuosoRef = useRef()

    const [modalIsOpen, setModalIsOpen] = useState(JSON.parse(localStorage.getItem('firstNotification')) ?? true)
    const [pageIndexes, setPageIndexes] = useState(JSON.parse(localStorage.getItem('pageIndexes')) ?? [])

    const closeModal = useCallback(() => {
        localStorage.setItem('firstNotification', JSON.stringify(false))
        setModalIsOpen(false)
    }, [])

    const temporaryFollow = (item) => {
        setFollowed((prev) => [...prev, item])
    }

    const temporaryUnFollow = (item) => {
        setUnFollowed((prev) => {
            if (prev !== item) {
                return [...prev, item]
            }
        })
    }

    useEffect(() => {
        dispatch(actions.followList(followed))
    }, [dispatch, followed])

    useEffect(() => {
        // localStorage.setItem('unFollowed', JSON.stringify(unFollowed))
        dispatch(actions.unFollowList(unFollowed))
    }, [dispatch, unFollowed])

    const handleUpdatePage = () => {
        setPage(() => {
            do {
                return Math.floor(Math.random() * TOTAL_PAGES_VIDEO)
            } while (pageIndexes.includes(Math.floor(Math.random() * TOTAL_PAGES_VIDEO)))
        })
    }

    const notificationProps = {
        title: 'Hello, Admin đây!',
        content:
            'Chuyện kể rằng, do chính sách của google tắt mọi âm thanh tự phát khi mà chưa có tương tác của người dùng, mà admin lại chưa nghĩ ra ý tưởng để pass qua cái đó, nên admin quyết định làm cái thông báo này để người dùng tương tác trước, mong thí chủ thông cảm cho Admin.',
        path: images.notificationCat,
    }

    useEffect(() => {
        ;(async () => {
            try {
                const response = await videoService.getVideo({
                    type: 'for-you',
                    page: 1,
                    accessToken,
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
                <updateContext.Provider value={{ temporaryFollow, followed, temporaryUnFollow, unFollowed }}>
                    <div className={cx('wrapper')} tabIndex={10}>
                        <Virtuoso
                            ref={virtuosoRef}
                            data={videos}
                            useWindowScroll
                            endReached={handleUpdatePage}
                            itemContent={(index, item) => {
                                return (
                                    <Video
                                        key={index}
                                        data={item}
                                        videos={videos}
                                        virtuosoRef={virtuosoRef}
                                        setFocusedIndex={setFocusedIndex}
                                        focusedIndex={focusedIndex}
                                    />
                                )
                            }}
                            components={{
                                Footer: () => {
                                    return <AccountLoading big />
                                },
                            }}
                        />
                    </div>
                </updateContext.Provider>
            )}
        </>
    )
}

export default memo(Home)
