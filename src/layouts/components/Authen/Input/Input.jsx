import classNames from 'classnames/bind'
import style from './Input.module.scss'
import React from 'react'
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useDarkMode from '~/hooks/useDarkMode'
import * as authService from '~/services/authService'
import config from '~/config'
import Button from '~/Components/Button'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(style)

function Input({ ...props } = {}) {
    const [hidePassword, setHidePassword] = useState(true)
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const setLocalStorage = (key, value) => {
        const Action = localStorage.setItem(key, JSON.stringify(value))
        window.location.reload()
        return Action
    }

    useEffect(() => {
        setIsValid(false)
    }, [email, password, props.signUp])

    const handleSubmitLogin = async () => {
        try {
            // call API when signUp
            if (props.signUp) {
                setLoading(true)
                const response = await authService.signUp(email, password)
                setLoading(false)
                if (response.meta && response.meta.token) {
                    setIsValid(false)
                    setLocalStorage('user', response)
                } else {
                    setIsValid(true)
                }
            }
            // call API  when log in
            else {
                setLoading(true)
                const response = await authService.login(email, password)
                setLoading(false)
                if (response.meta && response.meta.token) {
                    setIsValid(false)
                    setLocalStorage('user', response)
                } else {
                    setIsValid(true)
                }
            }
        } catch (error) {
            setIsValid(true)
        }
    }

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
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />

            <div className={cx('password-container')}>
                <input
                    type={hidePassword ? 'password' : 'text'}
                    className={cx('password')}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className={cx('invalid-password')}>
                    {isValid && !props.signUp && `Username or password doesn't match our records. Try again.`}
                    {props.signUp && isValid && 'Sign up invalid. Try again.'}
                </span>

                <span className={cx('forgot-password')}>Forgot Password?</span>
            </div>

            <Button to={config.routes.home} primary onClick={handleSubmitLogin} className={cx('login-btn')}>
                {loading || <span className={cx('login')}>Login</span>}
                {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}
            </Button>
        </div>
    )
}

export default React.memo(Input)
