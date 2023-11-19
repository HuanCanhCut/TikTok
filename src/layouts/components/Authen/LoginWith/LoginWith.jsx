import classNames from 'classnames/bind'
import style from './LoginWith.module.scss'
import React from 'react'
import { FacebookIcon, GoogleIcon } from '~/Components/Icons'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function LoginWith() {
    return (
        <div
            className={cx({
                darkMode: useDarkMode(),
            })}
        >
            <button className={cx('login-with')}>
                {/* <FontAwesomeIcon icon={faFacebook} className={cx('icon', 'facebook-icon')} /> */}
                <FacebookIcon width="19px" height="19px" className={cx('icon')} />
                <span>Continue with Facebook</span>
            </button>
            <button className={cx('login-with')}>
                <GoogleIcon className={cx('icon')} width="19px" height="19px" />
                <span>Continue with Google</span>
            </button>
            <div className={cx('more')}>
                <p>More</p>
            </div>
        </div>
    )
}
export default React.memo(LoginWith)
