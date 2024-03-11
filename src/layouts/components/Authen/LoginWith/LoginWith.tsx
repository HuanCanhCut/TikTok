import classNames from 'classnames/bind'
import style from './LoginWith.module.scss'
import React from 'react'
import { FacebookIcon, GoogleIcon } from '~/Components/Icons'

const cx = classNames.bind(style)

function LoginWith() {
    return (
        <>
            <button className={cx('login-with')}>
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
        </>
    )
}
export default React.memo(LoginWith)
