import { memo } from 'react'
import classNames from 'classnames/bind'
import style from './Live.module.scss'

const cx = classNames.bind(style)

function Live() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 60px)',
                textAlign: 'center',
                paddingLeft: 50,
                paddingRight: 50,
            }}
        >
            <h1 className={cx('heading')}>The API don't support live viewing.</h1>
        </div>
    )
}

export default memo(Live)
