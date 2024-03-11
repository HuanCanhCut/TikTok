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
import { useContext, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { themeSelector } from '~/redux/selectors'
import Modal from 'react-modal'
import { actions } from '~/redux'
import { openAuth } from '~/redux/selectors'

import Authen from '../Authen'
import { currentUserData } from '~/App'
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

const cx = classNames.bind(style)

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia as IconProp} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vn',
                    title: 'Tiếng Việt',
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
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useContext(currentUserData)
    const profile = currentUser && currentUser.data.nickname
    const [shortcutsIsOpen, setShortcutsIsOpen] = useState(false)
    const darkMode = useSelector(themeSelector)
    const isOpenAuth = useSelector(openAuth)

    const openKeyboardShortCuts = () => {
        setShortcutsIsOpen(true)
    }

    const modalIsOpen = useSelector(openAuth)

    const closeKeyboardShortCuts = () => {
        setShortcutsIsOpen(false)
    }

    const handleLogOut = async () => {
        try {
            await authService.logout({
                accessToken: currentUser.meta.token,
            })
            localStorage.removeItem('user')
            navigate(config.routes.home)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser as IconProp} />,
            title: 'View frofile',
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

    const handleMenuChange = (menuItem: { type: string; title: string; to?: string; separate?: boolean }) => {
        switch (menuItem.type) {
            case 'keyboard-shortcuts':
                openKeyboardShortCuts()
                break
            case 'log-out':
                handleLogOut()
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
                                Upload
                            </Button>
                            {/* Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context*/}
                            <div>
                                <Tippy delay={[0, 50]} content="Messages" interactive>
                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                            </div>
                            <div>
                                <Tippy delay={[0, 50]} content="Mail Box" interactive>
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
                                    dispatch(actions.openAuth(true))
                                }}
                                className={cx('upload')}
                            >
                                Upload
                            </Button>
                            <Button
                                primary
                                onClick={() => {
                                    dispatch(actions.openAuth(true))
                                }}
                            >
                                Log In
                            </Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image className={cx('user-avatar')} src={currentUser.data.avatar} alt="avatar" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical as IconProp}></FontAwesomeIcon>
                            </button>
                        )}
                    </Menu>
                </div>
            </div>

            {isOpenAuth && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => {
                        dispatch(actions.openAuth(false))
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
