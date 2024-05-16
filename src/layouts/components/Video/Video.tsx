import classNames from 'classnames/bind'
import { MutableRefObject, memo, useCallback, useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import ReactModal from 'react-modal'

import * as videoService from '~/services/videoService'
import style from './Video.module.scss'
import Header from './Header'
import VideoItem from '~/Components/VideoItem'
import AccountLoading from '~/Components/AccountLoading'
import { VideoModal } from '~/modal/modal'
import { listentEvent } from '~/helpers/event'
import { useDispatch, useSelector } from 'react-redux'
import { commentModalOpen } from '~/redux/selectors'
import CommentModal from '../CommentModal'
import { actions } from '~/redux'
import config from '~/config'

const cx = classNames.bind(style)

interface Props {
    type: string
}

interface ImperativeHandle {
    PLAY: () => void
    PAUSE: () => void
    PAUSED: () => boolean | undefined
    SETCURRENTTIME: (currentTime: number) => void
    GETCURRENTTIME: () => number
    GETCURRENTVIDEOMODAL: () => VideoModal | undefined
}

const TOTAL_PAGES_KEY = 'totalVideoPages'

const Video: React.FC<Props> = ({ type }) => {
    const dispatch = useDispatch()
    let TOTAL_PAGES_VIDEO: number = JSON.parse(localStorage.getItem(TOTAL_PAGES_KEY)!) || 0
    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const virtuosoRef = useRef<any>(null)
    const commentModalIsOpen = useSelector(commentModalOpen)

    const [videos, setVideos] = useState<VideoModal[]>([])
    const [currentVideo, setCurrentVideo] = useState<VideoModal | null>(null)
    const videoRef = useRef<ImperativeHandle | null>(null)

    const [page, setPage] = useState(() => {
        return Math.floor(Math.random() * TOTAL_PAGES_VIDEO)
    })
    const [videosIsVisible, setVideosIsVisible] = useState<HTMLVideoElement[]>([])
    const [pageIndexes, setPageIndexes] = useState<number[]>(
        JSON.parse(localStorage.getItem('pageVideoIndexes')!) ?? []
    )
    const [focusedIndex, setFocusedIndex] = useState(0)

    const scrollToIndex = (index: number) => {
        virtuosoRef.current && virtuosoRef.current.scrollToIndex({ index: index, align: 'center', behavior: 'smooth' })
    }

    useEffect(() => {
        const remove = listentEvent({
            eventName: 'comment:open-comment-modal',
            handler({ detail }) {
                setCurrentVideo(detail)
            },
        })

        return remove
    }, [])

    useEffect(() => {
        const remove = listentEvent({
            eventName: 'video:video-is-visible',
            handler: ({ detail }) => {
                setVideosIsVisible((prev: HTMLVideoElement[]) => {
                    return [...prev, detail]
                })
            },
        })

        return remove
    }, [])

    useEffect(() => {
        const remove = listentEvent({
            eventName: 'comment:delete-video',
            handler: ({ detail: videoModal }) => {
                // remove video from videos
                const newVideoList: VideoModal[] = videos.filter((video: VideoModal) => video.id !== videoModal.id)

                setVideos(newVideoList)
            },
        })

        return remove
    }, [videos])

    const handlePlayVideo = useCallback(
        (videoModalRef?: MutableRefObject<HTMLVideoElement | null>) => {
            if (videosIsVisible.length >= 2) {
                videosIsVisible.forEach((video: HTMLVideoElement) => {
                    video.pause()
                })

                const playVideo = async () => {
                    try {
                        videosIsVisible[videosIsVisible.length - 1].currentTime = videoModalRef?.current
                            ? videoModalRef?.current?.currentTime
                            : 0
                        await videosIsVisible[videosIsVisible.length - 1].play()
                    } catch (e) {}
                }
                playVideo()
            } else {
                videosIsVisible.forEach((video: HTMLVideoElement) => {
                    video.pause()
                })
                const playVideo = async () => {
                    try {
                        videosIsVisible[0].currentTime = videoModalRef?.current
                            ? videoModalRef?.current?.currentTime
                            : 0
                        await videosIsVisible[0].play()
                    } catch (e) {}
                }
                playVideo()
            }
        },
        [videosIsVisible]
    )

    useEffect(() => {
        if (commentModalIsOpen) {
            return
        }

        handlePlayVideo()
    }, [commentModalIsOpen, handlePlayVideo])

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
        const getVideos = async () => {
            try {
                const response = await videoService.getVideos({
                    type,
                    page,
                    accessToken,
                })

                if (response) {
                    localStorage.setItem(TOTAL_PAGES_KEY, JSON.stringify(response.meta.pagination.total_pages))

                    setVideos((prev) => {
                        return [...prev, ...response.data]
                    })

                    setPageIndexes((prev) => {
                        return [...prev, page]
                    })

                    localStorage.setItem('pageVideoIndexes', JSON.stringify(pageIndexes))
                }
            } catch (error) {
                console.log(error)
            }
        }
        getVideos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const handleScrollNextVideo = useCallback(() => {
        const nextIndex = focusedIndex + 1
        setFocusedIndex(nextIndex)
        scrollToIndex(nextIndex)
    }, [focusedIndex])

    const handleScrollPrevVideo = useCallback(() => {
        const prevIndex = focusedIndex - 1
        setFocusedIndex(prevIndex)
        scrollToIndex(prevIndex)
    }, [focusedIndex])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' && focusedIndex < videos.length - 1) {
                e.preventDefault()
                handleScrollNextVideo()
            }

            if (e.key === 'ArrowUp' && focusedIndex !== 0) {
                e.preventDefault()
                handleScrollPrevVideo()
            }

            if (e.key === 'End' || e.key === 'Home' || e.which === 33 || e.which === 34) {
                e.preventDefault()
            }
        },
        [focusedIndex, handleScrollNextVideo, handleScrollPrevVideo, videos.length]
    )

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusedIndex, videos.length])

    useEffect(() => {
        const remove = listentEvent({
            eventName: 'auth:open-auth-modal',
            handler: ({ detail: authModalIsOpen }) => {
                if (authModalIsOpen) {
                    window.removeEventListener('keydown', handleKeyDown)
                }
            },
        })

        return remove
    }, [handleKeyDown])

    const handleCloseCommnetModal = useCallback(
        (videoModalRef: MutableRefObject<HTMLVideoElement | null>) => {
            window.history.replaceState({}, '', `${config.routes.home}`)
            dispatch(actions.commentModalOpen(false))
            if (videoModalRef.current) {
                requestIdleCallback(() => {
                    handlePlayVideo(videoModalRef)
                })
            }
        },
        [dispatch, handlePlayVideo]
    )

    return (
        <>
            {currentVideo && (
                <ReactModal
                    isOpen={commentModalIsOpen}
                    onRequestClose={handleCloseCommnetModal}
                    overlayClassName={'overlay'}
                    ariaHideApp={false}
                    className={'modal'}
                    closeTimeoutMS={200}
                    shouldCloseOnEsc={false}
                    onKeyDown={(e: any) => {
                        if (e.key === 'Escape') {
                            e.preventDefault()
                            e.stopPropagation()
                        }
                    }}
                >
                    <CommentModal
                        video={currentVideo}
                        videoList={videos}
                        closeCommentModal={handleCloseCommnetModal}
                        currentTime={videoRef.current?.GETCURRENTTIME() || 0}
                        scrollNextVideo={handleScrollNextVideo}
                        scrollPrevVideo={handleScrollPrevVideo}
                    />
                </ReactModal>
            )}
            <Virtuoso
                ref={virtuosoRef}
                data={videos}
                useWindowScroll
                increaseViewportBy={{ top: 800, bottom: 300 }}
                endReached={() => {
                    setPage(() => {
                        do {
                            return Math.floor(Math.random() * TOTAL_PAGES_VIDEO)
                        } while (pageIndexes.includes(Math.floor(Math.random() * TOTAL_PAGES_VIDEO)))
                    })
                }}
                itemContent={(index, item) => {
                    return (
                        <div className={cx('video-content')} key={index}>
                            <Header data={item} type={type} />
                            <VideoItem video={item} ref={videoRef} videos={videos} setFocusedIndex={setFocusedIndex} />
                        </div>
                    )
                }}
                components={{
                    Footer: () => {
                        return <AccountLoading big />
                    },
                }}
            />
        </>
    )
}

export default memo(Video)
