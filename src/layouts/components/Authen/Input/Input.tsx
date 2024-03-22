import classNames from 'classnames/bind'
import style from './Input.module.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const cx = classNames.bind(style)

interface Props {
    email: string
    password: string
    setEmail: (value: string) => void
    setPassword: (value: string) => void
}

const Input: React.FC<Props> = ({ email, setEmail, password, setPassword }) => {
    const { t } = useTranslation()
    const [hidePassword, setHidePassword] = useState(true)

    return (
        <>
            <input
                type="text"
                className={cx('email')}
                placeholder="Email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />

            <div className={cx('password-container')}>
                <input
                    type={hidePassword ? 'password' : 'text'}
                    className={cx('password')}
                    placeholder={t('auth.password')}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                {hidePassword && (
                    <span
                        className={cx('hide-password', 'eye-icon')}
                        onClick={() => {
                            setHidePassword(false)
                        }}
                    >
                        <FontAwesomeIcon icon={faEyeSlash as IconProp} />
                    </span>
                )}
                {!hidePassword && (
                    <span
                        className={cx('display-password', 'eye-icon')}
                        onClick={() => {
                            setHidePassword(true)
                        }}
                    >
                        <FontAwesomeIcon icon={faEye as IconProp} />
                    </span>
                )}
            </div>
        </>
    )
}

export default React.memo(Input)
