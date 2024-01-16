import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { memo, useEffect, useRef, useContext, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'

import { currentUserData } from '~/App'
import * as videoService from '~/services/videoService'
import style from './Video.module.scss'
import Header from './Header'
import VideoItem from '~/Components/VideoItem'
import AccountLoading from '~/Components/AccountLoading'

const cx = classNames.bind(style)

const TOTAL_PAGES_KEY = 'totalVideoPages'
const TOTAL_PAGES_VIDEO = JSON.parse(localStorage.getItem(TOTAL_PAGES_KEY))
function Video({ type }) {
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    const virtuosoRef = useRef()

    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(() => {
        return Math.floor(Math.random() * TOTAL_PAGES_VIDEO)
    })
    const [pageIndexes, setPageIndexes] = useState(JSON.parse(localStorage.getItem('pageVideoIndexes')) ?? [])
    const [focusedIndex, setFocusedIndex] = useState(0)

    const scrollToIndex = (index) => {
        virtuosoRef.current.scrollToIndex({ index: index, align: 'center', behavior: 'smooth' })
    }

    const handleScroll = () => {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            const randomPage = Math.floor(Math.random() * TOTAL_PAGES_VIDEO)
            setPage(() => {
                do {
                    return randomPage
                } while (pageIndexes.includes(randomPage))
            })
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        ;(async () => {
            try {
                const response = await videoService.getVideo({
                    type,
                    page: page,
                    accessToken,
                })

                localStorage.setItem(TOTAL_PAGES_KEY, JSON.stringify(response.meta.pagination.total_pages))

                setVideos((prev) => {
                    return [...prev, ...response.data]
                })

                setPageIndexes((prev) => {
                    return [...prev, page]
                })

                localStorage.setItem('pageVideoIndexes', JSON.stringify(pageIndexes))
            } catch (error) {
                console.log(error)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

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

            if (e.key === 'End' || e.key === 'Home' || e.which === 33 || e.which === 34) {
                e.preventDefault()
            }
        }

        window.addEventListener('keydown', handleClickKeys)

        return () => {
            window.removeEventListener('keydown', handleClickKeys)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusedIndex, videos.length])

    return (
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
                return (
                    <div className={cx('video-content')}>
                        <Header data={item} />
                        <VideoItem video={item} />
                    </div>
                )
            }}
            components={{
                Footer: () => {
                    return <AccountLoading big />
                },
            }}
        />
    )
}

Video.propTypes = {
    type: PropTypes.string.isRequired,
}

export default memo(Video)
