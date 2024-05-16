import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { Wrapper as PopperWrapper } from '~/Components/Popper'
import style from './KeyboardShorcuts.module.scss'
import { LKeyboard, MKeyboard, ArrowUp, ArrowDown } from '~/Components/Icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useTranslation } from 'react-i18next'

const cx = classNames.bind(style)

const shortcutsItems = [
    {
        title: 'Go to previous video',
        icon: <ArrowUp />,
    },
    {
        title: 'Go to next video',
        icon: <ArrowDown />,
    },
    {
        title: 'Like video',
        icon: <LKeyboard />,
    },
    {
        title: 'Mute / unMute video',
        icon: <MKeyboard />,
    },
]

interface Props {
    onClose: () => void
}

const KeyboardShortcuts: React.FC<Props> = ({ onClose }) => {
    const { t } = useTranslation()
    return (
        <PopperWrapper className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>{t('keyboard shortcuts.keyboard shortcuts')}</h2>
            </div>
            <button className={cx('close')} onClick={onClose}>
                <FontAwesomeIcon className={cx('close-icon')} icon={faXmark as IconProp} />
            </button>

            <div className={cx('body')}>
                {shortcutsItems.map((shortcutsItem, index) => {
                    return (
                        <div className={cx('shortcuts-item')} key={index}>
                            <p>{t(`keyboard shortcuts.${shortcutsItem.title.toLowerCase()}`)}</p>
                            <div className={cx('icon-wrapper')}>
                                <p>{shortcutsItem.icon}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </PopperWrapper>
    )
}

export default KeyboardShortcuts
