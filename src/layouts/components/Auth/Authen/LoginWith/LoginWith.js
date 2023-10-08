import classNames from 'classnames/bind'
import style from './LoginWith.module.scss'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

const cx = classNames.bind(style)

function loginWith() {
    return (
        <React.Fragment>
            <button className={cx('login-with')}>
                <FontAwesomeIcon icon={faFacebook} className={cx('icon', 'facebook-icon')} />
                <span>Continue with Facebook</span>
            </button>
            <button className={cx('login-with')}>
                <FontAwesomeIcon icon={faGoogle} className={cx('icon', 'google-icon')} />
                <span>Continue with Google</span>
            </button>
            <div className={cx('more')}>
                <p>More</p>
            </div>
        </React.Fragment>
    )
}
export default React.memo(loginWith)
