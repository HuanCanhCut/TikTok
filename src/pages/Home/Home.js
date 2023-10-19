import { memo, useEffect, useState, useRef } from 'react'
import classNames from 'classnames/bind'
import Modal from 'react-modal'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Virtuoso } from 'react-virtuoso'

import style from './Home.module.scss'
import Video from '~/layouts/components/Video'
import * as videoService from '~/services/videoService'
import { GoToTop } from '~/Components/Icons'
import Notification from '~/Components/Notification'

const cx = classNames.bind(style)

const INIT_PAGE = 1
function Home() {
    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(INIT_PAGE)
    const [isOpen, setIsOpen] = useState(true)
    const [goToTop, setGoToTop] = useState(false)
    const headerIntoview = useRef()

    // const overlayStyle = {
    //     position: 'fixed',
    //     top: 0,
    //     right: 0,
    //     left: 0,
    //     bottom: 0,
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // }

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleGoToTop = () => {
        headerIntoview.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        })
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
        <div className={cx('wrapper')}>
            {isOpen || (
                <Virtuoso
                    data={videos}
                    useWindowScroll
                    endReached={() => {
                        setPage(page + 1)
                    }}
                    itemContent={(index, item) => {
                        return <Video key={index} data={item} />
                    }}
                    components={{
                        Header: () => {
                            return <div className={cx('header-intoview')} ref={headerIntoview}></div>
                        },
                        Footer: () => {
                            return (
                                <button className={cx('load-more')}>
                                    <FontAwesomeIcon icon={faSpinner} />
                                </button>
                            )
                        },
                    }}
                />
            )}

            {goToTop && (
                <button className={cx('go-to-top')} onClick={handleGoToTop}>
                    <GoToTop width="16px" height="16px" />
                </button>
            )}

            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    overlayClassName={cx('overlay')}
                    className={cx('ads')}
                    ariaHideApp={false}
                >
                    <Notification
                        title="Tại sao lại có thông báo này ?"
                        content="Chuyện kể rằng chính sách của google sẽ tắt mọi âm thanh tự động phát trước khi người dùng tương tác, và Dev thì chưa nghĩ ra được gì hay để giải quyết nên quyết định làm cái thông báo này để người dùng tương tác trước khi video được chạy, mong bạn thông cảm cho Dev cây nhà là vườn nhé ❤️"
                        path="https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-1.jpg?v=1690276113335"
                        closeModal={closeModal}
                    />
                </Modal>
            )}
        </div>
    )
}

export default memo(Home)
