import classNames from 'classnames/bind'
import style from './Header.module.scss'
import { useState, memo, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { faComment, faEllipsis, faHeart, faMusic } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { authCurrentUser, temporaryLiked, temporaryUnLiked } from '~/redux/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import ReactModal from 'react-modal'

import * as videoService from '~/services/videoService'
import PopperEffect from '~/Components/PopperEffect'
import Image from '~/Components/Images/Image'
import Follow from '~/Components/Follow'
import HightLightDescription from '~/Components/Description/Description'
import AccountPreview from '~/Components/AccountPreview'
import { VideoModal } from '~/modal/modal'
import Button from '~/Components/Button'
import { copyToClipboard, likeVideo, showToast, unLikeVideo } from '~/project/services'
import { sendEvent } from '~/helpers/event'
import Tippy from '@tippyjs/react'
import Share from '~/Components/Share/Share'
import { EmbedIcon, FacebookIcon, ShareIcon, TwitterIcon, WhatsAppIcon } from '~/Components/Icons'

interface Props {
    currentVideo: VideoModal
}

const cx = classNames.bind(style)

const Header: React.FC<Props> = ({ currentVideo }) => {
    const dispatch = useDispatch()

    const { t } = useTranslation()
    const currentUser = useSelector(authCurrentUser)
    const accessToken = JSON.parse(localStorage.getItem('token')!)
    const temporaryLikeList: number[] = useSelector(temporaryLiked)
    const temporaryUnLikeList: number[] = useSelector(temporaryUnLiked)

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const renderAccountPreview = () => {
        return <AccountPreview data={currentVideo.user} />
    }

    const handleDeleteVideo = async () => {
        setDeleteModalOpen(false)
        try {
            const response = await videoService.deleteVideo({
                videoID: currentVideo.id,
                accessToken: accessToken,
            })

            if (response?.status === 200 || response?.status === 204) {
                showToast({ message: t('comment.delete video successfully') })
                sendEvent({ eventName: 'comment:delete-video', detail: currentVideo })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true)
    }

    const renderVideoOptions = () => {
        return (
            <div className={cx('action-wrapper')}>
                <Tippy content={t('comment.sorry, the API does not support this feature')}>
                    <Button rounded className={cx('privacy-btn', 'video-action-btn')}>
                        {t('comment.privacy settings')}
                    </Button>
                </Tippy>
                <Button rounded className={cx('delete-video-btn', 'video-action-btn')} onClick={handleOpenDeleteModal}>
                    {t('comment.delete')}
                </Button>
            </div>
        )
    }

    const handleToggleLike = () => {
        if (!currentUser || !accessToken) {
            sendEvent({ eventName: 'auth:open-auth-modal', detail: true })
            return
        }

        if (currentVideo.is_liked || temporaryLikeList.includes(currentVideo.id)) {
            if (temporaryUnLikeList.includes(currentVideo.id)) {
                likeVideo({
                    dispatch,
                    temporaryUnLikeList,
                    video: currentVideo,
                    id: currentVideo.id,
                    accessToken,
                })
            } else {
                unLikeVideo({
                    dispatch,
                    temporaryLikeList,
                    video: currentVideo,
                    id: currentVideo.id,
                    accessToken,
                })
            }
        } else {
            likeVideo({
                dispatch,
                temporaryUnLikeList,
                video: currentVideo,
                id: currentVideo.id,
                accessToken,
            })
        }
    }

    const likes_count = useCallback(() => {
        if (currentVideo.is_liked && !temporaryUnLikeList.includes(currentVideo.id)) {
            return currentVideo.likes_count
        }

        if (currentVideo.is_liked && temporaryUnLikeList.includes(currentVideo.id)) {
            return currentVideo.likes_count - 1
        }

        if (temporaryLikeList.includes(currentVideo.id)) {
            return currentVideo.likes_count + 1
        } else {
            return currentVideo.likes_count
        }
    }, [currentVideo.id, currentVideo.is_liked, currentVideo.likes_count, temporaryLikeList, temporaryUnLikeList])

    const isLiked = () => {
        if (currentVideo.is_liked || temporaryLikeList.includes(currentVideo.id)) {
            if (temporaryUnLikeList.includes(currentVideo.id)) {
                return false
            }
            return true
        }
    }

    interface ShareProps {
        type: string
        icon: React.ReactNode
        tooltip: string
    }

    const shareIcons: ShareProps[] = useMemo(() => {
        return [
            {
                type: 'embed',
                tooltip: 'embed',
                icon: <EmbedIcon />,
            },
            {
                type: 'facebook',
                tooltip: 'share to facebook',
                icon: <FacebookIcon width="24" height="24" />,
            },
            {
                type: 'whatsapp',
                tooltip: 'share to whats app',
                icon: <WhatsAppIcon />,
            },
            {
                type: 'twitter',
                tooltip: 'share to twitter',
                icon: <TwitterIcon />,
            },
        ]
    }, [])

    const handleCopyLink = () => {
        try {
            copyToClipboard(`${window.location.href}`)
            showToast({ message: t('profile.copy successfully') })
        } catch (error) {
            showToast({ message: t('profile.copy failed') })
        }
    }

    return (
        <header className={cx('comment-header')}>
            <ReactModal
                isOpen={deleteModalOpen}
                onRequestClose={() => setDeleteModalOpen(false)}
                className={'modal'}
                ariaHideApp={false}
                overlayClassName={cx('overlay')}
                closeTimeoutMS={200}
            >
                <div className={cx('delete-modal')}>
                    <p className={cx('delete-title')}>{t('comment.are you sure you want to delete this video?')}</p>
                    <Button className={cx('delete-btn')} onClick={handleDeleteVideo}>
                        Delete
                    </Button>
                    <Button
                        className={cx('cancel-btn')}
                        onClick={() => {
                            setDeleteModalOpen(false)
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </ReactModal>
            <div className={cx('user-profile')}>
                <div className={cx('user-info-container')}>
                    <PopperEffect
                        renderItem={renderAccountPreview}
                        hideOnClick
                        timeDelayClose={200}
                        timeDelayOpen={600}
                        offsetX={0}
                        offsetY={15}
                    >
                        <Link to={`/user/@${currentVideo.user.nickname}`} className={cx('user-info')}>
                            <Image src={currentVideo.user.avatar} className={cx('user-avatar')} />
                            <div className={cx('user-name')}>
                                <span className={cx('nick-name')}>{currentVideo.user.nickname}</span>
                                <span
                                    className={cx('full-name')}
                                >{`${currentVideo.user.first_name} ${currentVideo.user.last_name}`}</span>
                            </div>
                        </Link>
                    </PopperEffect>
                    {currentUser?.id !== currentVideo.user.id ? (
                        <Follow data={currentVideo.user} />
                    ) : (
                        <PopperEffect
                            renderItem={renderVideoOptions}
                            hideOnClick={false}
                            timeDelayClose={200}
                            timeDelayOpen={600}
                            offsetX={0}
                            offsetY={15}
                        >
                            <button className={cx('video-option-btn')}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </button>
                        </PopperEffect>
                    )}
                </div>

                <div className={cx('video-info')}>
                    <HightLightDescription
                        description={currentVideo.description}
                        user={currentVideo.user}
                        className={cx('description')}
                    />
                    {currentVideo.music && (
                        <span className={cx('video-music')}>
                            <FontAwesomeIcon icon={faMusic} className={cx('music-icon')} />
                            {currentVideo.music}
                        </span>
                    )}
                </div>
            </div>
            <div className={cx('video-options-container')}>
                <div className={cx('video-interaction-container')}>
                    <div className={cx('video-interaction-item')}>
                        <div className={cx('interaction-btn')}>
                            <Button
                                iconBtn
                                className={cx('like-btn', {
                                    isLiked: isLiked(),
                                })}
                                onClick={handleToggleLike}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </Button>
                            {likes_count()}
                        </div>
                        <div className={cx('interaction-btn')}>
                            <Button iconBtn className={cx('comment-btn')}>
                                <FontAwesomeIcon icon={faComment} />
                            </Button>
                            {currentVideo.comments_count}
                        </div>
                    </div>

                    <div className={cx('share-video-options')}>
                        {shareIcons.map((item, index) => (
                            <div key={index}>
                                <Tippy content={t(`profile.${item.tooltip}`)}>
                                    <button className={cx('share-btn-icon')}>{item.icon}</button>
                                </Tippy>
                            </div>
                        ))}
                        <Share>
                            <ShareIcon className={cx('share-icon')} />
                        </Share>
                    </div>
                </div>
                <div className={cx('copy-link')}>
                    <p
                        className={cx('link')}
                    >{`${window.location.href}/@${currentVideo.user.nickname}/video/${currentVideo.uuid}`}</p>
                    <Button rounded className={cx('copy-link-btn')} onClick={handleCopyLink}>
                        {t('comment.copy link')}
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)
