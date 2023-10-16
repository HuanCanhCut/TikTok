import { memo, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import Modal from 'react-modal'

import style from './Home.module.scss'
import Video from '~/layouts/components/Video'
import * as videoService from '~/services/videoService'
import { Virtuoso } from 'react-virtuoso'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(style)

const INIT_PAGE = 1
function Home() {
    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(INIT_PAGE)
    const [isOpen, setIsOpen] = useState(true)

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }

    const closeModal = () => {
        setIsOpen(false)
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

            {isOpen && (
                <div style={overlayStyle}>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={closeModal}
                        overlayClassName={cx('overlay')}
                        className={cx('ads')}
                    >
                        <button className={cx('des')}>
                            Do chính sách của google tắt mọi âm thanh khi web đc load mà chưa có tương tác của người
                            dùng nên admin quyết định làm cái notification này để fix bug tạm thời, mong thí chủ thông
                            cảm :))
                        </button>
                        <button className={cx('close')} onClick={closeModal}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </Modal>
                </div>
            )}
        </div>
    )
}

export default memo(Home)
