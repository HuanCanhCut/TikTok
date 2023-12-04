import classNames from 'classnames/bind'
import style from './FooterSidebar.module.scss'
import { memo } from 'react'
import Button from '~/Components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHurricane } from '@fortawesome/free-solid-svg-icons'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

const contact = [
    'About',
    'Newsroom',
    'Contact',
    'Careers',
    'TikTok for Good',
    'Advertise',
    'Developers',
    'Transparency',
    'TikTok Rewards',
    'TikTok Embeds',
    'Help',
    'Safety',
    'Terms',
    'Privacy',
    'Creator',
    'PortalCommunity',
    'Guidelines',
]

function FooterSidebar() {
    const date = new Date()
    const Year = date.getFullYear()

    return (
        <div className={cx('wrapper')}>
            <Button
                className={cx('create-effect', {
                    darkMode: useDarkMode(),
                })}
                leftIcon={<FontAwesomeIcon icon={faHurricane} />}
                target="_blank"
                onClick={() => {
                    window.location.assign(
                        'https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v2&utm_source=tiktok_webapp_main'
                    )
                }}
            >
                Create effects
            </Button>

            <ul className={cx('contact')}>
                {contact.map((item, index) => {
                    return (
                        <span key={index} className={cx('contact-item')}>
                            {item}
                        </span>
                    )
                })}
            </ul>
            <div className={cx('current-version')}>{`@ ${Year} Tiktok`}</div>
        </div>
    )
}

export default memo(FooterSidebar)
