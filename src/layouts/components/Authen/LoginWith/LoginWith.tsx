import classNames from 'classnames/bind'
import style from './LoginWith.module.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FacebookIcon, GoogleIcon } from '~/Components/Icons'

const cx = classNames.bind(style)

function LoginWith() {
    const { t } = useTranslation()
    return (
        <>
            <button className={cx('login-with')}>
                <FacebookIcon width="19px" height="19px" className={cx('icon')} />
                <span>{t('auth.continue with facebook')}</span>
            </button>
            <button className={cx('login-with')}>
                <GoogleIcon className={cx('icon')} width="19px" height="19px" />
                <span>{t('auth.continue with google')}</span>
            </button>
            <div className={cx('more')}>
                <p>{t('auth.more')}</p>
            </div>
        </>
    )
}
export default React.memo(LoginWith)
