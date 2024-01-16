import classNames from 'classnames/bind'
import style from './Login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { memo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { actions } from '~/redux'

import { useState } from 'react'
import * as Auth from '~/services/authService'
import Button from '~/Components/Button'
import LoginWith from './LoginWith/LoginWith'
import Policy from './Policy'
import Input from './Input'
import config from '~/config'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function Authen() {
    const buttonRef = useRef()

    const dispatch = useDispatch()
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

    const callApi = async (options) => {
        setLoading(true)
        const response = await Auth[options](email, password)
        setLoading(false)
        if (response && response.meta.token) {
            setIsValid(false)
            setLocalStorage('user', response)
        } else {
            setIsValid(true)
        }
    }

    const handleSubmitLogin = async () => {
        try {
            signUp ? callApi('signUp') : callApi('login')
        } catch (error) {
            setIsValid(true)
        }
    }

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                buttonRef.current.click()
                break
            default:
        }
    }

    const handleLoginOptions = () => {
        setSignUp(signUp ? false : true)
        setIsValid(false)
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: '-100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-100%' }}
                transition={{ duration: 0.1 }}
            >
                <div
                    className={cx('wrapper', {
                        darkMode: useDarkMode(),
                    })}
                    onKeyDown={handleKeyDown}
                >
                    <button
                        className={cx('close')}
                        onClick={() => {
                            dispatch(actions.openAuth(false))
                        }}
                    >
                        <FontAwesomeIcon className={cx('close-icon')} icon={faXmark} />
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

                        <Button
                            ref={buttonRef}
                            to={config.routes.home}
                            primary
                            onClick={handleSubmitLogin}
                            className={cx('login-btn')}
                        >
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
            </motion.div>
        </AnimatePresence>
    )
}

export default memo(Authen)
