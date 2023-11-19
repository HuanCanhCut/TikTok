import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './FollowingAccounts.module.scss'
import BlueTick from '~/Components/BlueTick/BlueTick'
import Image from '~/Components/Images'

const cx = classNames.bind(style)

function AccountItem({ data }) {
    return (
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <div className={cx('account-item')}>
                <Image className={cx('avatar')} src={data.avatar} alt="" />
                <div className={cx('account-info')}>
                    <p className={cx('nickname')}>
                        <strong>{data.nickname}</strong>
                        <span className={cx('icon')}>{data.tick && <BlueTick />}</span>
                    </p>
                    <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                </div>
            </div>
        </div>
    )
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountItem
