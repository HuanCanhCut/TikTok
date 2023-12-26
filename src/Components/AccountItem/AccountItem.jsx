import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './AccountItem.module.scss'
import { Link } from 'react-router-dom'
import Images from '~/Components/Images'
import BlueTick from '../BlueTick/BlueTick'

const cx = classNames.bind(style)

function AccountItem({ data }) {
    return (
        <Link to={`/user/@${data.nickname}`} className={cx('wrapper')}>
            <Images className={cx('avatar')} src={data.avatar} alt="" />
            <div className={cx('Info')}>
                <h4 className={cx('name')}>
                    <span>{`${data.first_name} ${data.last_name}`}</span>
                    {data.tick && <BlueTick />}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    )
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountItem
