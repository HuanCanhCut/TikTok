import classNames from 'classnames/bind'
import style from './UserProfile.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { handleFollowAnUser, handleUnFollowAnUser } from '~/project/services'
import { UserModal } from '~/modal/modal'
import Image from '~/Components/Images/Image'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faBan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Button from '~/Components/Button'
import { useTranslation } from 'react-i18next'
import { Ellipsis, MessageIcon, ShareIcon, UserIcon } from '~/Components/Icons'
import PopperEffect from '~/Components/PopperEffect'
import { useCallback, useEffect, useState } from 'react'
import { faFlag } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { authCurrentUser, temporaryFollowed, temporaryUnFollowed } from '~/redux/selectors'
import Tippy from '@tippyjs/react'
import Statistical from './Statistical'
import EditProfileModal from './EditProfileModal'
import Modal from '~/Components/Modal'
import { FileUploadModal } from '~/pages/Upload/Upload'
import Share from '~/Components/Share/Share'

const cx = classNames.bind(style)

interface Props {
    userProfile: UserModal
}

interface ShareType {
    type: string
    title: string
    icon: React.ReactNode
    enabled?: boolean
}

let shareMore: ShareType[] = [
    {
        type: 'send message',
        icon: <MessageIcon width="18" height="18" />,
        title: 'send message',
    },
    {
        type: 'report',
        icon: <FontAwesomeIcon icon={faFlag as IconProp} />,
        title: 'report',
    },
    {
        type: 'block',
        icon: <FontAwesomeIcon icon={faBan as IconProp} />,
        title: 'block',
    },
]

const UserProfile: React.FC<Props> = ({ userProfile }) => {
    const dispatch = useDispatch()

    const currentUser = useSelector(authCurrentUser)

    const { t } = useTranslation()

    const [isCallingApi, setIsCallingApi] = useState(false)
    const [isOpenEditProfile, setIsOpenEditProfile] = useState(false)
    const [file, setFile] = useState<FileUploadModal>()

    const temporaryUnFollowedList: number[] = useSelector(temporaryUnFollowed)
    const temporaryFollowedList: number[] = useSelector(temporaryFollowed)

    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const handleOpenEditProfile = () => {
        setIsOpenEditProfile(true)
    }

    const handleCloseModal = useCallback(() => {
        setIsOpenEditProfile(false)
    }, [])

    const renderShareMoreOptions = useCallback(() => {
        return (
            <div className={cx('share-more-wrapper')}>
                {shareMore.map((item, index) => {
                    return (
                        <Button key={index} rounded className={cx('share-option-btn')} leftIcon={item.icon}>
                            {t(`profile.${item.title}`)}
                        </Button>
                    )
                })}
            </div>
        )
    }, [t])

    const handleFollow = useCallback(() => {
        handleFollowAnUser({
            accessToken,
            isCallingApi,
            temporaryUnFollowedList: temporaryUnFollowedList,
            user: userProfile,
            dispatch: dispatch,
            currentUser: currentUser,
            setIsCallingApi,
        })
    }, [accessToken, currentUser, dispatch, isCallingApi, temporaryUnFollowedList, userProfile])

    const handleUnFollow = useCallback(() => {
        handleUnFollowAnUser({
            accessToken,
            isCallingApi,
            temporaryFollowedList: temporaryFollowedList,
            user: userProfile,
            dispatch: dispatch,
            currentUser: currentUser,
            setIsCallingApi,
        })
    }, [accessToken, currentUser, dispatch, isCallingApi, temporaryFollowedList, userProfile])

    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file.preview)
        }
    }, [file, userProfile])

    return (
        <>
            <div className={cx('wrapper')}>
                <Image src={userProfile.avatar} className={cx('avatar')} />
                <div className={cx('title-container')}>
                    <h1 className={cx('username')}>{userProfile.nickname}</h1>
                    <h2 className={cx('fullname')}>{`${userProfile.first_name} ${userProfile.last_name}`}</h2>
                    {userProfile.id === currentUser?.id ? (
                        <>
                            <Modal isOpen={isOpenEditProfile} closeModal={handleCloseModal}>
                                <EditProfileModal
                                    currentUser={currentUser}
                                    setProfileIsOpen={setIsOpenEditProfile}
                                    file={file}
                                    setFile={setFile}
                                />
                            </Modal>
                            <Button
                                rounded
                                leftIcon={<FontAwesomeIcon icon={faPenToSquare as IconProp} />}
                                className={cx('edit-profile-btn')}
                                onClick={handleOpenEditProfile}
                            >
                                {t('profile.edit profile')}
                            </Button>
                        </>
                    ) : (
                        <div className={cx('follow-container')}>
                            {userProfile.is_followed || temporaryFollowedList.includes(userProfile.id) ? (
                                temporaryUnFollowedList.includes(userProfile.id) ? (
                                    <Button primary onClick={handleFollow} className={cx('follow-btn')}>
                                        {t('videos.follow')}
                                    </Button>
                                ) : (
                                    <>
                                        <Button className={cx('follow-btn')} outline>
                                            {t('profile.message')}
                                        </Button>
                                        <Tippy content="Unfollow" placement="bottom">
                                            <button onClick={handleUnFollow} className={cx('unfollow-user')}>
                                                <UserIcon />
                                            </button>
                                        </Tippy>
                                    </>
                                )
                            ) : (
                                <Button primary onClick={handleFollow} className={cx('follow-btn')}>
                                    {t('videos.follow')}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                <div className={cx('share-options')}>
                    <Share>
                        <ShareIcon />
                    </Share>

                    <PopperEffect
                        renderItem={renderShareMoreOptions}
                        timeDelayClose={100}
                        timeDelayOpen={50}
                        hideOnClick={false}
                    >
                        <div className={cx('ellipsis-icon')}>
                            <Ellipsis />
                        </div>
                    </PopperEffect>
                </div>
            </div>
            {userProfile && <Statistical userProfile={userProfile} currentUser={currentUser} />}
        </>
    )
}

export default UserProfile
