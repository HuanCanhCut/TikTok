import classNames from 'classnames/bind'
import style from './AccountItem.module.scss'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const cx = classNames.bind(style)

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7ecdc0484cd40a2238cff9b92d992a78~c5_100x100.jpeg?x-expires=1695308400&x-signature=XXl8uzQ1XGQbiOY4csrUuj6uFvA%3D" alt="" />
            <div className={cx('Info')}>
                <h4 className={cx('name')}>
                    <span>Cao trong huan</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
                </h4>
                <span className={cx('usename')}>caotronghuan</span>
            </div>
        </div>
    )
}

export default AccountItem
