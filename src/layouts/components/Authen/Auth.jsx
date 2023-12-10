import classNames from 'classnames/bind'
import style from './Login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { memo } from 'react'
import Modal from 'react-modal'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { openAuth } from '~/redux/selectors'
import { useDispatch } from 'react-redux'
import { actions } from '~/redux'

import { useState } from 'react'
import LoginWith from './LoginWith/LoginWith'
import Policy from './Policy'
import Input from './Input'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function Authen() {
    const dispatch = useDispatch()
    const [signUp, setSignUp] = useState(false)
    const modalIsOpen = useSelector(openAuth)

    const handleLoginOptions = () => {
        setSignUp(signUp ? false : true)
    }

    return (
        <AnimatePresence>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    dispatch(actions.openAuth(false))
                }}
                overlayClassName={'overlay'}
                ariaHideApp={false}
                className={'modal'}
            >
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
                            <Input signUp={signUp} />

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
            </Modal>
        </AnimatePresence>
    )
}

export default memo(Authen)
