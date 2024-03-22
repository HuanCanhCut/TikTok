import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faGear,
    faUser,
    faSignOut,
    faPlus,
    faMoon,
} from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { Link } from 'react-router-dom'
import { useState, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authCurrentUser, themeSelector } from '~/redux/selectors'
import Modal from 'react-modal'
import { useTranslation } from 'react-i18next'

import Authen from '../Authen'
import config from '~/config'
import Button from '~/Components/Button'
import Menu from '~/Components/Popper/Menu'
import style from './Header.module.scss'
import images from '~/assets/images'
import { MessageIcon, InboxIcon } from '~/Components/Icons'
import Search from '../../../Components/Search'
import Image from '~/Components/Images'
import KeyboardShortcuts from './KeyboardShorcuts'
import * as authService from '~/services/authService'
import { useNavigate } from 'react-router-dom'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { listentEvent } from '~/helpers/event'
import { actions } from '~/redux'
import { UserModal } from '~/modal/modal'

const cx = classNames.bind(style)

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia as IconProp} />,
        title: 'Current language',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'lang',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'lang',
                    code: 'vi',
                    title: 'vietnamese',
                },
            ],
        },
    },
    {
        type: 'feedback',
        icon: <FontAwesomeIcon icon={faCircleQuestion as IconProp} />,
        title: 'Feedback and help',
    },
    {
        type: 'keyboard-shortcuts',
        icon: <FontAwesomeIcon icon={faKeyboard as IconProp} />,
        title: 'Keyboard shortcuts',
    },
    {
        icon: <FontAwesomeIcon icon={faMoon as IconProp} />,
        title: 'Dark mode',
        switch: true,
    },
]

function Header() {
    const { t, i18n } = useTranslation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentUser: UserModal = useSelector(authCurrentUser)
    const profile = currentUser && currentUser.nickname
    const [shortcutsIsOpen, setShortcutsIsOpen] = useState(false)
    const darkMode = useSelector(themeSelector)
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false)

    useEffect(() => {
        const remove = listentEvent({
            eventName: 'auth:open-auth-modal',
            handler: ({ detail: isOpen }) => {
                setIsOpenAuthModal(isOpen)
            },
        })

        return remove
    }, [])

    const openKeyboardShortCuts = () => {
        setShortcutsIsOpen(true)
    }

    const closeKeyboardShortCuts = () => {
        setShortcutsIsOpen(false)
    }

    const handleLogOut = async () => {
        try {
            await authService.logout({
                accessToken: JSON.parse(localStorage.getItem('token')!),
            })
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            dispatch(actions.logOut(null))

            navigate(config.routes.home)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser as IconProp} />,
            title: 'View profile',
            to: `/user/@${profile}`,
        },
        {
            icon: <FontAwesomeIcon icon={faGear as IconProp} />,
            title: 'Settings',
            to: '/settings',
        },

        ...MENU_ITEM,
        {
            type: 'log-out',
            icon: <FontAwesomeIcon icon={faSignOut as IconProp} />,
            title: 'Log out',
            separate: true,
        },
    ]

    const handleSetLanguage = (locale: string) => {
        const currentLanguage = JSON.parse(localStorage.getItem('currentLanguage')!)
        if (currentLanguage !== locale) {
            i18n.changeLanguage(locale)
            localStorage.setItem('currentLanguage', JSON.stringify(locale))
        }
    }

    const handleMenuChange = (menuItem: {
        type: string
        title: string
        to?: string
        separate?: boolean
        code?: string
    }) => {
        switch (menuItem.type) {
            case 'keyboard-shortcuts':
                openKeyboardShortCuts()
                break
            case 'log-out':
                handleLogOut()
                break
            case 'lang':
                menuItem.code && handleSetLanguage(menuItem.code)
                break
            default:
                break
        }
    }

    const closeKeyboardModal = () => {
        setShortcutsIsOpen(false)
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={darkMode ? images.lightLogo : images.darkLogo} alt="Logo" />
                </Link>

                <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button
                                to={config.routes.upload}
                                rounded
                                leftIcon={<FontAwesomeIcon icon={faPlus as IconProp} />}
                            >
                                {t('header.upload')}
                            </Button>
                            {/* Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context*/}
                            <div>
                                <Tippy delay={[0, 50]} content={t('header.message')} interactive>
                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                            </div>
                            <div>
                                <Tippy delay={[0, 50]} content={t('header.mail box')} interactive>
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                    </button>
                                </Tippy>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button
                                rounded
                                leftIcon={<FontAwesomeIcon icon={faPlus as IconProp} />}
                                onClick={() => {
                                    setIsOpenAuthModal(true)
                                }}
                                className={cx('upload')}
                            >
                                {t('header.upload')}
                            </Button>
                            <Button
                                primary
                                onClick={() => {
                                    setIsOpenAuthModal(true)
                                }}
                            >
                                {t('header.login')}
                            </Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image className={cx('user-avatar')} src={currentUser.avatar} alt="avatar" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical as IconProp}></FontAwesomeIcon>
                            </button>
                        )}
                    </Menu>
                </div>
            </div>

            {isOpenAuthModal && (
                <Modal
                    isOpen={isOpenAuthModal}
                    onRequestClose={() => {
                        setIsOpenAuthModal(false)
                    }}
                    overlayClassName={'overlay'}
                    ariaHideApp={false}
                    className={'modal'}
                >
                    <Authen />
                </Modal>
            )}

            {shortcutsIsOpen && (
                <Modal
                    isOpen={shortcutsIsOpen}
                    onRequestClose={closeKeyboardShortCuts}
                    overlayClassName={cx('overlay')}
                    ariaHideApp={false}
                    className={cx('modal')}
                >
                    <KeyboardShortcuts onClose={closeKeyboardModal} />
                </Modal>
            )}
        </header>
    )
}

export default memo(Header)
