import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './AccountPreview.module.scss'
import Follow from '../Follow'
import { Link } from 'react-router-dom'

import BlueTick from '~/Components/BlueTick/BlueTick'
import Image from '~/Components/Images'

const cx = classNames.bind(style)

function AccountPreview({ data }) {
    return (
        <div className={cx('preview')}>
            <header className={cx('header')}>
                <Link to={`/user/@${data.nickname}`}>
                    <Image className={cx('avatar')} src={data.avatar} alt="" />
                </Link>
                <Follow data={data} />
            </header>
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <Link to={`/user/@${data.nickname}`}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            <span className={cx('icon')}>{data.tick && <BlueTick />}</span>
                        </p>
                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </Link>
                </div>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followings_count}</strong>
                    <span>Followers</span>
                    <strong className={cx('value')}>{data.followers_count}</strong>
                    <span>Likes</span>
                </p>
            </div>
        </div>
    )
}

AccountPreview.propTypes = {
    data: PropTypes.object,
}

export default AccountPreview
