import classNames from 'classnames/bind'
import style from './Auth.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { memo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useState } from 'react'
import { login, signUp as authSignUp } from '~/services/authService'
import Button from '~/Components/Button'
import LoginWith from './LoginWith/LoginWith'
import Policy from './Policy'
import Input from './Input'
import config from '~/config'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { keyboardKey } from '@testing-library/user-event'
import { AxiosResponse } from 'axios'
import { sendEvent } from '~/helpers/event'

const cx = classNames.bind(style)

function Authen() {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [signUp, setSignUp] = useState(false)

    const setLocalStorage = (key: string, value: any) => {
        const Action = localStorage.setItem(key, JSON.stringify(value))
        window.location.reload()
        return Action
    }

    const callApi = async (option: string) => {
        setLoading(true)
        let response: AxiosResponse

        if (option === 'signUp') {
            response = await authSignUp({ email, password })
        } else {
            response = await login({ email, password })
        }

        setLoading(false)
        if (response) {
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

    const handleKeyDown = (e: keyboardKey) => {
        switch (e.key) {
            case 'Enter':
                buttonRef.current && buttonRef.current.click()
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
                    className={cx('wrapper')}
                    onKeyDown={(e) => {
                        handleKeyDown(e)
                    }}
                >
                    <button
                        className={cx('close')}
                        onClick={() => {
                            sendEvent({ eventName: 'auth:open-auth-modal', detail: false })
                        }}
                    >
                        <FontAwesomeIcon className={cx('close-icon')} icon={faXmark as IconProp} />
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
                            {loading && <FontAwesomeIcon icon={faSpinner as IconProp} className={cx('loading')} />}
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
