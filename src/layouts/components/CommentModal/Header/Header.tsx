import classNames from 'classnames/bind'
import style from './Header.module.scss'
import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { faEllipsis, faMusic } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { authCurrentUser } from '~/redux/selectors'
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
import { showToast } from '~/project/services'
import { sendEvent } from '~/helpers/event'
import Tippy from '@tippyjs/react'

interface Props {
    currentVideo: VideoModal
}

const cx = classNames.bind(style)

const Header: React.FC<Props> = ({ currentVideo }) => {
    const { t } = useTranslation()
    const currentUser = useSelector(authCurrentUser)
    const accessToken = JSON.parse(localStorage.getItem('token')!)

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
                    <HightLightDescription description={currentVideo.description} user={currentVideo.user} />
                    {currentVideo.music && (
                        <span className={cx('video-music')}>
                            <FontAwesomeIcon icon={faMusic} className={cx('music-icon')} />
                            {currentVideo.music}
                        </span>
                    )}
                </div>
            </div>
        </header>
    )
}

export default memo(Header)
