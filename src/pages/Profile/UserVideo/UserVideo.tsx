import classNames from 'classnames/bind'
import style from './UserVideo.module.scss'
import { useMemo, useState, memo, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useTranslation } from 'react-i18next'
import { UserModal, VideoModal } from '~/modal/modal'
import { Lock, User } from '~/Components/Icons'
import { documentIsVisible } from '~/project/services'

const cx = classNames.bind(style)

interface Tabs {
    type: string
    title: string
    icon?: React.ReactNode
}

interface Props {
    userProfile: UserModal
}

const UserVideo: React.FC<Props> = ({ userProfile }) => {
    const { t } = useTranslation()

    const tabs: Tabs[] = useMemo(() => {
        return [
            {
                type: 'videos',
                title: 'Videos',
            },
            {
                type: 'liked',
                title: 'Liked',
                icon: <FontAwesomeIcon icon={faLock as IconProp} />,
            },
        ]
    }, [])

    const [currentTab, setCurrentTab] = useState(tabs[0].type)
    const [currentElementTab, setCurrentElementTab] = useState<HTMLDivElement | null>(null)
    const [playingVideo, setPlayingVideo] = useState<HTMLVideoElement | null>(null)

    const lineRef = useRef<HTMLDivElement | null>(null)
    const firstTabRef = useRef<HTMLDivElement | null>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)

    const handleHoverTab = (e: React.MouseEvent) => {
        const target = e.target as HTMLDivElement

        if (lineRef.current) {
            lineRef.current.style.width = target.offsetWidth + 'px'
            lineRef.current.style.left = target.offsetLeft + 'px'
        }
    }

    const handleMouseLeave = () => {
        if (lineRef.current) {
            if (currentElementTab) {
                lineRef.current.style.width = currentElementTab.offsetWidth + 'px'
                lineRef.current.style.left = currentElementTab.offsetLeft + 'px'
            } else {
                if (firstTabRef.current && lineRef.current) {
                    lineRef.current.style.width = firstTabRef.current.offsetWidth + 'px'
                    lineRef.current.style.left = firstTabRef.current.offsetLeft + 'px'
                }
            }
        }
    }

    const handleChoseTab = (e: React.MouseEvent, item: Tabs) => {
        const target = e.target as HTMLDivElement

        setCurrentTab(item.type)
        setCurrentElementTab(target)

        if (lineRef.current) {
            lineRef.current.style.width = target.offsetWidth + 'px'
            lineRef.current.style.left = target.offsetLeft + 'px'
        }
    }

    const handleHoverVideo = async (e: React.MouseEvent) => {
        const currentVideo = e.target as HTMLVideoElement

        if (currentVideo !== playingVideo) {
            if (playingVideo && !playingVideo.paused) {
                playingVideo.pause()
            }
            setPlayingVideo(currentVideo)

            try {
                currentVideo.currentTime = 0
                await currentVideo.play()
            } catch (e) {}
        }
    }

    useEffect(() => {
        const remove = videoRef.current ? documentIsVisible(videoRef.current) : () => {}

        return remove
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('tab-bar')}>
                <div className={cx('tab-bar-container')}>
                    {tabs.map((item: Tabs, index) => {
                        return (
                            <div
                                key={index}
                                className={cx('tab', {
                                    active: currentTab === item.type,
                                })}
                                onMouseEnter={handleHoverTab}
                                onMouseLeave={handleMouseLeave}
                                onClick={(e) => {
                                    handleChoseTab(e, item)
                                }}
                                ref={index === 0 ? firstTabRef : null}
                            >
                                {item.icon && <span className={cx('lock-icon')}>{item.icon}</span>}
                                <span>{t(`profile.${item.title.toLowerCase()}`)}</span>
                            </div>
                        )
                    })}
                </div>
                <div className={cx('line')} ref={lineRef}></div>
            </div>
            <div className={cx('video-container')}>
                {currentTab === 'videos' ? (
                    <div className={cx('videos-wrapper')}>
                        {userProfile.videos?.length === 0 && (
                            <div className={cx('no-video')}>
                                <User />
                                <h2 className={cx('upload-first-video')}>{t('profile.upload your first video')}</h2>
                                <p>{t('profile.your videos will appear here')}</p>
                            </div>
                        )}
                        {userProfile.videos &&
                            userProfile.videos.map((item: VideoModal) => {
                                return (
                                    <div key={item.id} className={cx('video-item')}>
                                        <video
                                            ref={videoRef}
                                            src={item.file_url}
                                            muted
                                            className={cx('video')}
                                            onMouseOver={handleHoverVideo}
                                        ></video>
                                        <span className={cx('video-description')}>{item.description}</span>
                                    </div>
                                )
                            })}
                    </div>
                ) : (
                    <div className={cx('liked-wrapper')}>
                        <div className={cx('liked-private')}>
                            <Lock width="90" height="90" />
                            <h2 className={cx('upload-first-video')}>
                                {t(`profile.this user's liked videos are private`)}
                            </h2>
                            <p>{`${t('profile.videos liked by')} ${userProfile.nickname} ${t(
                                'profile.are currently hidden'
                            )}`}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(UserVideo)
