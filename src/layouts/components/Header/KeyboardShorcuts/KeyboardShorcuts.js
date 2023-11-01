import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { Wrapper as PopperWrapper } from '~/Components/Popper'
import style from './KeyboardShorcuts.module.scss'
import useDarkMode from '~/hooks/useDarkMode'
import { LKeyboard, MKeyboard, SpaceKeyboard, ShiftKeyboard } from '~/Components/Icons'

const cx = classNames.bind(style)

const shortcutsItems = [
    {
        title: 'Prev Video : Shift + Space',
        icon: <SpaceKeyboard />,
        leftIcon: <ShiftKeyboard />,
    },
    {
        title: 'Next Video : Space',
        icon: <SpaceKeyboard />,
    },
    {
        title: 'Like video',
        icon: <MKeyboard />,
    },
    {
        title: 'Mute / unMute video',
        icon: <LKeyboard />,
    },
]

function KeyboardShortcuts({ onClose }) {
    return (
        <PopperWrapper
            className={cx('wrapper', {
                darkMode: useDarkMode(),
            })}
        >
            <div className={cx('header')}>
                <h2>Keyboard Shortcuts</h2>
            </div>
            <button className={cx('close')} onClick={onClose}>
                <FontAwesomeIcon className={cx('close-icon')} icon={faXmark} />
            </button>

            <div className={cx('body')}>
                {shortcutsItems.map((shortcutsItem, index) => {
                    return (
                        <div className={cx('shortcuts-item')} key={index}>
                            <p>{shortcutsItem.title}</p>
                            <div className={cx('icon-wrapper')}>
                                <p className={cx('left-icon')}>{shortcutsItem.leftIcon}</p>
                                <p>{shortcutsItem.icon}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </PopperWrapper>
    )
}

KeyboardShortcuts.propTypes = {
    onClose: PropTypes.func.isRequired,
}

export default KeyboardShortcuts
