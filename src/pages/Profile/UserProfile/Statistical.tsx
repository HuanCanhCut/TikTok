import classNames from 'classnames/bind'
import style from './UserProfile.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useTranslation } from 'react-i18next'

import { UserModal } from '~/modal/modal'
import Modal from '~/Components/Modal'
import { Lock } from '~/Components/Icons'
import * as userServices from '~/services/userService'
import AccountItem from './AccountItem'

const cx = classNames.bind(style)

interface Tabs {
    type: 'following' | 'follower' | 'suggested'
    title: string
    statistical?: number
}

const Statistical = ({ userProfile, currentUser }: { userProfile: UserModal; currentUser: UserModal }) => {
    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState<'following' | 'follower' | 'suggested'>('following')
    const [suggestedUser, setSuggestedUser] = useState<UserModal[] | []>([])
    const [followingList, setFollowingList] = useState<UserModal[] | []>([])
    const [page, setPage] = useState(1)
    const [followingPage, setFollowingPage] = useState(1)

    const tabs: Tabs[] = useMemo(() => {
        return [
            {
                type: 'following',
                title: 'Following',
                statistical: userProfile.followings_count,
            },
            {
                type: 'follower',
                title: 'Followers',
                statistical: userProfile.followers_count,
            },
            {
                type: 'suggested',
                title: 'Suggested',
            },
        ]
    }, [userProfile.followers_count, userProfile.followings_count])

    const handleChoseTab = (e: any) => {
        const target = e.target.closest('#tab')
        const type: 'following' | 'follower' | 'suggested' = target.dataset.type

        setType(type)
    }

    const handleCloseModal = useCallback(() => {
        setIsOpen(false)
    }, [])

    const handleOpenModal = useCallback((e: any) => {
        setType(e.target.dataset.type)
        setIsOpen(true)
    }, [])

    useEffect(() => {
        const getSuggestedUser = async () => {
            try {
                const response = await userServices.getSuggestedAccounts({
                    page: page,
                    perPage: 10,
                    accessToken,
                })

                for (let i = 0; i < response.data.length; ++i) {
                    if (!response.data[i].is_followed) {
                        setSuggestedUser((prev) => {
                            return [...prev, response.data[i]]
                        })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        getSuggestedUser()
    }, [accessToken, page])

    useEffect(() => {
        const minUsersSuggested = 8
        if (suggestedUser.length < minUsersSuggested) {
            setPage(page + 1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [suggestedUser.length])

    const handleScroll = (e: any) => {
        if (e.target.scrollTop + e.target.offsetHeight >= e.target.offsetHeight) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        if (currentUser.id === userProfile.id) {
            const getFollowingAccount = async () => {
                try {
                    const response = await userServices.getFollowingAccounts({ page: followingPage, accessToken })
                    setFollowingList((prev) => {
                        return [...prev, ...response.data]
                    })
                } catch (error) {
                    console.log(error)
                }
            }

            getFollowingAccount()
        }
    }, [accessToken, currentUser, followingPage, userProfile])

    const renderModal = useCallback(() => {
        return (
            <div className={cx('modal-wrapper')}>
                <header>
                    <div className={cx('nickname-container')}>
                        <h1 className={cx('nickname')}>{userProfile.nickname}</h1>
                        <span className={cx('close-modal')} onClick={handleCloseModal}>
                            <FontAwesomeIcon icon={faXmark as IconProp} />
                        </span>
                    </div>
                    <div className={cx('tabs')}>
                        {tabs.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    id="tab"
                                    className={cx('tab', { active: type === item.type })}
                                    data-type={item.type}
                                    onClick={handleChoseTab}
                                >
                                    <span>{t(`profile.${item.title.toLowerCase()}`)}</span>
                                    <span>{item?.statistical}</span>
                                </button>
                            )
                        })}
                    </div>
                </header>
                <div className={cx('content')} onScroll={handleScroll}>
                    {type === 'suggested' ? (
                        suggestedUser.map((item, index) => {
                            return <AccountItem data={item} key={index} />
                        })
                    ) : currentUser.id === userProfile.id ? (
                        type === 'follower' ? (
                            <h1>API does not support viewing followers</h1>
                        ) : (
                            followingList.map((item, index) => {
                                return <AccountItem data={item} key={index} />
                            })
                        )
                    ) : (
                        <div className={cx('private-content')}>
                            <Lock width="72px" height="72px" />
                            <h1 style={{ textWrap: 'nowrap', fontSize: '2.8rem' }}>
                                {type === 'following'
                                    ? t('profile.private follow list')
                                    : t('profile.private follower list')}
                            </h1>
                            <p>
                                {type === 'following'
                                    ? t('profile.followers list is currently hidden')
                                    : t('profile.following list is currently hidden')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleCloseModal, suggestedUser, t, tabs, type, userProfile.nickname])

    return (
        <>
            <div className={cx('statistical')}>
                <Modal isOpen={isOpen} closeModal={handleCloseModal}>
                    {renderModal()}
                </Modal>
                <div className={cx('statistical-item')}>
                    <strong>{userProfile.followings_count}</strong>
                    <span
                        className={cx('following')}
                        data-type="following"
                        onClick={(e: any) => {
                            handleOpenModal(e)
                        }}
                    >
                        {t('profile.following')}
                    </span>
                </div>
                <div className={cx('statistical-item')}>
                    <strong>{userProfile.followers_count}</strong>
                    <span
                        className={cx('follower')}
                        data-type="follower"
                        onClick={(e: any) => {
                            handleOpenModal(e)
                        }}
                    >
                        {t('profile.followers')}
                    </span>
                </div>
                <div className={cx('statistical-item')}>
                    <strong>{userProfile.likes_count}</strong>
                    <span>{t('profile.like')}</span>
                </div>
            </div>
            <div className={cx('bio')}>
                <h2>{userProfile.bio}</h2>
            </div>
        </>
    )
}

export default Statistical
