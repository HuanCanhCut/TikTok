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
import { useContext, useState, useCallback, memo } from 'react'
import { useSelector } from 'react-redux'
import { themeSelector } from '~/redux/selectors'
import Modal from 'react-modal'

import Authen from '../Authen'
import { currentUserData } from '~/App'
import config from '~/config'
import Button from '~/Components/Button'
import Menu from '~/Components/Popper/Menu'
import style from './Header.module.scss'
import images from '~/assets/images'
import { MessageIcon, InboxIcon } from '~/Components/Icons'
import Search from '../Search'
import Image from '~/Components/Images'
import KeyboardShortcuts from './KeyboardShorcuts'
import * as authService from '~/services/authService'

const cx = classNames.bind(style)

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
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
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: config.routes.feedback,
    },
    {
        type: 'keyboard-shortcuts',
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
    {
        icon: <FontAwesomeIcon icon={faMoon} />,
        title: 'Dark mode',
        switch: true,
    },
]

function Header() {
    const currentUser = useContext(currentUserData)
    const profile = currentUser && currentUser.data.nickname
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [shortcutsIsOpen, setShortcutsIsOpen] = useState(false)
    const darkMode = useSelector(themeSelector)

    const openKeyboardShortCuts = () => {
        setShortcutsIsOpen(true)
    }

    const closeKeyboardShortCuts = () => {
        setShortcutsIsOpen(false)
    }

    const handleLogOut = async () => {
        try {
            const response = await authService.logout({
                accessToken: currentUser.meta.token,
            })
            localStorage.removeItem('user')
            window.location.reload()
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View frofile',
            to: `/@${profile}`,
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },

        ...MENU_ITEM,
        {
            type: 'log-out',
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            separate: true,
        },
    ]

    const handleMenuChange = (menuItem) => {
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

    const openModal = useCallback(() => {
        setModalIsOpen(true)
    }, [])

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const closeKeyboardModal = () => {
        setShortcutsIsOpen(false)
    }

    return (
        <header className={cx('wrapper', { darkMode })}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={darkMode ? images.lightLogo : images.darkLogo} alt="Logo" />
                </Link>

                <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button to={config.routes.upload} rounded leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>
                            <Tippy delay={[0, 50]} content="Messages">
                                <button className={cx('action-btn', { darkMode })}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Mail Box">
                                <button className={cx('action-btn', { darkMode })}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button rounded leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={openModal}>
                                Upload
                            </Button>
                            <Button primary onClick={openModal}>
                                Log In
                            </Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image className={cx('user-avatar')} src={currentUser.data.avatar} alt="avatar" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                            </button>
                        )}
                    </Menu>
                </div>
            </div>

            <Authen isOpen={modalIsOpen} onClose={closeModal} />

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
