import classNames from 'classnames/bind'
import style from './Input.module.scss'
import React, { KeyboardEvent, useEffect, useRef } from 'react'
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
    const [inputFocusIndex, setInputFocusIndex] = useState<number>(0)

    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    const inputsRef: React.MutableRefObject<React.MutableRefObject<HTMLInputElement | null>[]> = useRef([
        emailRef,
        passwordRef,
    ])

    useEffect(() => {
        if (!emailRef.current || inputsRef.current.length <= 0) {
            return
        }

        inputsRef.current[inputFocusIndex].current?.focus()
    }, [inputFocusIndex])

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'ArrowDown':
                setInputFocusIndex((prev: number) => {
                    if (prev >= inputsRef.current.length - 1) {
                        return 0
                    }
                    return prev + 1
                })

                break
            case 'ArrowUp':
                setInputFocusIndex((prev: number) => {
                    if (prev <= 0) {
                        return inputsRef.current.length - 1
                    }
                    return prev - 1
                })
                break
            default:
                break
        }
    }

    return (
        <div onKeyDown={handleKeyDown}>
            <input
                ref={emailRef}
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
                    ref={passwordRef}
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
        </div>
    )
}

export default React.memo(Input)
