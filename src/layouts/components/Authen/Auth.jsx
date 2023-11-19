import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './Login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { memo } from 'react'
import Modal from 'react-modal'

import { useState } from 'react'
import * as Auth from '~/services/authService'
import Button from '~/Components/Button'
import LoginWith from './LoginWith/LoginWith'
import Policy from './Policy'
import Input from './Input'
import config from '~/config'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function Authen({ onClose, isOpen }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [signUp, setSignUp] = useState(false)

    const setLocalStorage = (key, value) => {
        const Action = localStorage.setItem(key, JSON.stringify(value))
        window.location.reload()
        return Action
    }

    const handleSubmitLogin = async () => {
        try {
            // call API when signUp
            if (signUp) {
                setLoading(true)
                const response = await Auth.signUp(email, password)
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
                const response = await Auth.login(email, password)
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

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                handleSubmitLogin()
                break
            default:
        }
    }

    const handleLoginOptions = () => {
        setSignUp(signUp ? false : true)
        setIsValid(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName={cx('overlay')}
            ariaHideApp={false}
            className={cx('modal')}
        >
            <div
                className={cx('wrapper', {
                    darkMode: useDarkMode(),
                })}
                onKeyDown={handleKeyDown}
            >
                <button className={cx('close')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <header className={cx('header')}>
                    <h1 className={cx('title')}>{signUp ? 'Sign up to TikTok' : 'Login to TikTok'}</h1>
                </header>

                <div className={cx('body')}>
                    <Input setEmail={setEmail} setPassword={setPassword} email={email} password={password} />

                    <span className={cx('invalid-password')}>
                        {isValid && !signUp && `Username or password doesn't match our records. Try again.`}
                        {signUp && isValid && 'Sign up isValid. Try again'}
                    </span>

                    <span className={cx('forgot-password')}>Forgot Password?</span>

                    <Button to={config.routes.home} primary onClick={handleSubmitLogin} className={cx('login-btn')}>
                        {loading || <span className={cx('login')}>Login</span>}
                        {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}
                    </Button>

                    <div className={cx('separator')}>
                        <span className={cx('separator-line')}></span>
                        <span className={cx('separator-content')}>Or continue with</span>
                        <span className={cx('separator-line')}></span>
                    </div>
                    <LoginWith />
                    <Policy />
                </div>
                <div className={cx('footer')}>
                    <p>
                        {signUp ? 'Already have an account? ' : `Don't have an account? `}
                        <span className={cx('sign-up')} onClick={handleLoginOptions}>
                            {signUp ? 'Login' : 'Sign Up'}
                        </span>
                    </p>
                </div>
            </div>
        </Modal>
    )
}

Authen.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
}

export default memo(Authen)
