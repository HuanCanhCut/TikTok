import classNames from 'classnames/bind'
import style from './UserProfile.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { copyToClipboard, handleFollowAnUser, handleUnFollowAnUser, showToast } from '~/project/services'
import { UserModal } from '~/modal/modal'
import Image from '~/Components/Images/Image'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faBan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Button from '~/Components/Button'
import { useTranslation } from 'react-i18next'
import {
    ArrowDownSeeMore,
    Ellipsis,
    EmailIcon,
    EmbedIcon,
    FacebookIcon,
    LinkIcon,
    LinkedInIcon,
    MessageIcon,
    RedditIcon,
    Share,
    TelegramIcon,
    TwitterIcon,
    UserIcon,
    WhatsAppIcon,
} from '~/Components/Icons'
import PopperEffect from '~/Components/PopperEffect'
import { useCallback, useState } from 'react'
import { faFlag } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { temporaryFollowed, temporaryUnFollowed } from '~/redux/selectors'
import Tippy from '@tippyjs/react'
import Statistical from './Statistical'

const cx = classNames.bind(style)

interface Props {
    userProfile: UserModal
    currentUser: UserModal
}

interface ShareType {
    type: string
    title: string
    icon: React.ReactNode
    enabled?: boolean
}

let shareItems: ShareType[] = [
    {
        type: 'embed',
        title: 'embed',
        icon: <EmbedIcon />,
    },
    {
        type: 'facebook',
        title: 'share to facebook',
        icon: <FacebookIcon width="24" height="24" />,
    },
    {
        type: 'whatsapp',
        title: 'share to whats app',
        icon: <WhatsAppIcon />,
    },
    {
        type: 'twitter',
        title: 'share to twitter',
        icon: <TwitterIcon />,
    },
    {
        type: 'copy link',
        title: 'copy link',
        icon: <LinkIcon />,
        enabled: true,
    },
    {
        type: 'linkedln',
        title: 'share to linkedln',
        icon: <LinkedInIcon />,
    },
    {
        type: 'reddit',
        title: 'share to reddit',
        icon: <RedditIcon />,
    },
    {
        type: 'telegram',
        title: 'share to telegram',
        icon: <TelegramIcon />,
    },
    {
        type: 'email',
        title: 'share to email',
        icon: <EmailIcon />,
    },
    {
        type: 'line',
        title: 'share to line',
        icon: <TelegramIcon />,
    },
]

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

const UserProfile: React.FC<Props> = ({ userProfile, currentUser }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const [hideSeeMore, setHideSeeMore] = useState(false)
    const [isCallingApi, setIsCallingApi] = useState(false)

    const temporaryUnFollowedList: number[] = useSelector(temporaryUnFollowed)
    const temporaryFollowedList: number[] = useSelector(temporaryFollowed)

    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const handleChoseOptions = useCallback(
        (item: ShareType) => {
            switch (item.type) {
                case 'copy link':
                    const url = window.location.href
                    try {
                        copyToClipboard(url)
                        showToast({ message: t('profile.copy successfully') })
                    } catch (error) {
                        showToast({ message: t('profile.copy failed') })
                    }
                    break
                default:
                    break
            }
        },
        [t]
    )

    const renderShare = useCallback(
        (onHide?: boolean) => {
            onHide && setHideSeeMore(false)
            return (
                <div className={cx('share-wrapper')} style={hideSeeMore ? { height: '420px' } : {}}>
                    <div
                        className={cx('share-item')}
                        style={
                            hideSeeMore ? { overflow: 'overlay' } : { overflow: 'hidden', height: 'calc(100% - 40px)' }
                        }
                    >
                        {shareItems.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    leftIcon={item.icon}
                                    rounded
                                    className={cx('share-option-btn', {
                                        enabled: item.enabled,
                                    })}
                                    onClick={() => {
                                        handleChoseOptions(item)
                                    }}
                                >
                                    {t(`profile.${item.title}`)}
                                </Button>
                            )
                        })}
                    </div>
                    {!hideSeeMore && (
                        <Button
                            rounded
                            className={cx('see-more-btn')}
                            onClick={() => {
                                setHideSeeMore(true)
                            }}
                        >
                            <ArrowDownSeeMore />
                        </Button>
                    )}
                </div>
            )
        },
        [handleChoseOptions, hideSeeMore, t]
    )

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

    return (
        <>
            <div className={cx('wrapper')}>
                <Image src={userProfile.avatar} className={cx('avatar')} />
                <div className={cx('title-container')}>
                    <h1 className={cx('username')}>{userProfile.nickname}</h1>
                    <h2 className={cx('fullname')}>{`${userProfile.first_name} ${userProfile.last_name}`}</h2>
                    {userProfile.id === currentUser?.id ? (
                        <Button
                            rounded
                            leftIcon={<FontAwesomeIcon icon={faPenToSquare as IconProp} />}
                            className={cx('edit-profile-btn')}
                        >
                            {t('profile.edit profile')}
                        </Button>
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
                    <PopperEffect renderItem={renderShare} timeDelayClose={100} timeDelayOpen={50} hideOnClick={false}>
                        <div className={cx('share-icon')}>
                            <Share />
                        </div>
                    </PopperEffect>

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
            {userProfile && <Statistical userProfile={userProfile} />}
        </>
    )
}

export default UserProfile
