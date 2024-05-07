import classNames from 'classnames/bind'
import style from './Following.module.scss'
import { useSelector } from 'react-redux'
import { authCurrentUser } from '~/redux/selectors'
import { useEffect, useState, memo } from 'react'
import { VideoModal } from '~/modal/modal'
import { getVideos } from '~/services/videoService'
import AccountItem from './AccountItem'
import Loading from '~/Components/Loading'
import Video from '~/layouts/components/Video'

const cx = classNames.bind(style)

const Following: React.FC = () => {
    const currentUser = useSelector(authCurrentUser)
    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const [videos, setVideos] = useState<VideoModal[] | []>([])
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    const [playingVideo, setPlayingVideo] = useState<HTMLVideoElement | null>(null)

    const handleVideoHover = (video: HTMLVideoElement) => {
        if (video !== playingVideo) {
            if (playingVideo && !playingVideo.paused) {
                playingVideo.pause()
            }
            setPlayingVideo(video)
        }
    }

    useEffect(() => {
        document.title = 'Following - Watch videos from creators you follow | TikTok'
    }, [])

    useEffect(() => {
        const handleGetVideos = async () => {
            try {
                if (!accessToken) {
                    setLoading(true)
                    const response = await getVideos({
                        page: page,
                        accessToken,
                    })

                    setVideos((prev: VideoModal[]) => {
                        return [...prev, ...response.data]
                    })
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        handleGetVideos()
    }, [accessToken, page])

    useEffect(() => {
        const handleScroll = (e: any) => {
            if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
                setPage((prev: number) => {
                    return prev + 1
                })
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className={cx('wrapper')}>
            {currentUser ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 'var(--default-layout-content-width)' }}>
                        <Video type="following" />
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className={cx('container')}>
                        {videos.map((item: VideoModal, index: number) => {
                            return (
                                <div key={index}>
                                    <AccountItem item={item} onVideoHover={handleVideoHover} />
                                </div>
                            )
                        })}
                        {loading && <Loading />}
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(Following)
