import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard, faCoins, faGear, faUser, faSignOut, faPlus } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react'
import { Link } from 'react-router-dom'

import config from '~/config'
import Button from '~/Components/Button'
import Menu from '~/Components/Popper/Menu'
import style from './Header.module.scss'
import images from '~/assets/images'
import { MessageIcon, InboxIcon } from '~/Components/Icons'
import Search from '../Search'
import Image from '~/Components/Images'

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
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
]

function Header() {
    const currentUser = true

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                break
            default:
                break
        }
    }

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View frofile',
            to: '/@penguindev',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },

        ...MENU_ITEM,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            separate: true,
        },
    ]

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tik Tok Logo" />
                </Link>

                <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button rounded leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>

                            <Tippy delay={[0, 50]} content="Messages">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Mail Box">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log In</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image className={cx('user-avatar')} src="https://avatars.githubusercontent.com/u/107424860?v=4s" alt="avatar" fallback="https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/312642158_626141889234049_3437225901091098349_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=52f669&_nc_ohc=gsidQcBL8R0AX_2mdX9&_nc_ht=scontent.fhan5-2.fna&oh=00_AfCR3wsjjGD2GqHzclLE1zkznJfVwRjDIMOIxP638ysaoA&oe=65145261" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Header
