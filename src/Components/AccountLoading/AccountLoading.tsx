import classNames from 'classnames/bind'
import style from './AccountLoading.module.scss'

const cx = classNames.bind(style)

function AccountLoading({ big = false }) {
    const classes = {
        big,
    }

    return (
        <div className={cx('account-loading', classes)}>
            <div className={cx('avatar')}></div>
            <div className={cx('account-info')}>
                <div className={cx('nick-name')}> </div>
                <div className={cx('name')}> </div>
            </div>
        </div>
    )
}

export default AccountLoading
