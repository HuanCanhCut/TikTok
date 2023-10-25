import classNames from 'classnames/bind'
import style from './Input.module.scss'
import React from 'react'
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function Input({ ...props } = {}) {
    const [hidePassword, setHidePassword] = useState(true)

    return (
        <div
            className={cx({
                darkMode: useDarkMode(),
            })}
        >
            <input
                type="text"
                className={cx('email')}
                placeholder="Email"
                onChange={(e) => {
                    props.setEmail(e.target.value)
                }}
            />

            <div className={cx('password-container')}>
                <input
                    type={hidePassword ? 'password' : 'text'}
                    className={cx('password')}
                    placeholder="Password"
                    onChange={(e) => {
                        props.setPassword(e.target.value)
                    }}
                />
                {hidePassword && (
                    <span
                        className={cx('hide-password')}
                        onClick={() => {
                            setHidePassword(false)
                        }}
                    >
                        <FontAwesomeIcon icon={faEyeSlash} />
                    </span>
                )}
                {!hidePassword && (
                    <span
                        className={cx('display-password')}
                        onClick={() => {
                            setHidePassword(true)
                        }}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </span>
                )}
            </div>
        </div>
    )
}

export default React.memo(Input)
