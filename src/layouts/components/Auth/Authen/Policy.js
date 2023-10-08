import style from './Login.module.scss'
import classNames from 'classnames/bind'
import { memo } from 'react'

const cx = classNames.bind(style)

function Policy() {
    return (
        <div className={cx('policy')}>
            <p>
                By continuing, you agree to TikTok’s Terms of Service and confirm that you have read TikTok’s Privacy
                Policy.
            </p>
        </div>
    )
}

export default memo(Policy)
