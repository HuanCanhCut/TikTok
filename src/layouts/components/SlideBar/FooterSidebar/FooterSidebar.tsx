import classNames from 'classnames/bind'
import style from './FooterSidebar.module.scss'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '~/Components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHurricane } from '@fortawesome/free-solid-svg-icons'
import useDarkMode from '~/hooks/useDarkMode'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const cx = classNames.bind(style)

function FooterSidebar() {
    const { t } = useTranslation()

    const contact = [
        t('sidebar.about'),
        t('sidebar.newsroom'),
        t('sidebar.contact'),
        t('sidebar.careers'),
        t('sidebar.tikTok for Good'),
        t('sidebar.advertise'),
        t('sidebar.developers'),
        t('sidebar.transparency'),
        t('sidebar.tikTok Rewards'),
        t('sidebar.tikTok Embeds'),
        t('sidebar.help'),
        t('sidebar.safety'),
        t('sidebar.terms'),
        t('sidebar.privacy'),
        t('sidebar.creator portal'),
        t('sidebar.community guidelines'),
    ]

    const date = new Date()
    const Year = date.getFullYear()

    return (
        <div className={cx('wrapper')}>
            <Button
                className={cx('create-effect', {
                    darkMode: useDarkMode(),
                })}
                leftIcon={<FontAwesomeIcon icon={faHurricane as IconProp} />}
                onClick={() => {
                    window.location.assign(
                        'https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v2&utm_source=tiktok_webapp_main'
                    )
                }}
            >
                {t('sidebar.create effects')}
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
