import classNames from 'classnames/bind'
import style from './Share.module.scss'
import { useCallback, useState } from 'react'
import PopperEffect from '../PopperEffect'
import { copyToClipboard, showToast } from '~/project/services'

import {
    ArrowDownSeeMore,
    EmailIcon,
    EmbedIcon,
    FacebookIcon,
    LinkIcon,
    LinkedInIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsAppIcon,
} from '~/Components/Icons'
import Button from '../Button'
import { useTranslation } from 'react-i18next'

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

const cx = classNames.bind(style)

interface Props {
    children?: React.ReactNode
    copyValue?: string
}

const Share: React.FC<Props> = ({ children, copyValue = window.location.href }) => {
    const { t } = useTranslation()
    const [hideSeeMore, setHideSeeMore] = useState(false)

    const handleChoseOptions = useCallback(
        (item: ShareType) => {
            switch (item.type) {
                case 'copy link':
                    try {
                        copyToClipboard(copyValue)
                        showToast({ message: t('profile.copy successfully') })
                    } catch (error) {
                        showToast({ message: t('profile.copy failed') })
                    }
                    break
                default:
                    break
            }
        },
        [copyValue, t]
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
    return (
        <PopperEffect renderItem={renderShare} timeDelayClose={200} timeDelayOpen={300} hideOnClick={false}>
            <div className={cx('share-btn')}>{children}</div>
        </PopperEffect>
    )
}

export default Share
