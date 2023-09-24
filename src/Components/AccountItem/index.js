import classNames from 'classnames/bind'
import style from './AccountItem.module.scss'
import { Link } from 'react-router-dom'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Images from '~/Components/Images'

const cx = classNames.bind(style)

function AccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Images className={cx('avatar')} src={data.avatar} alt="" />
            <div className={cx('Info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
                </h4>
                <span className={cx('usename')}>{data.nickname}</span>
            </div>
        </Link>
    )
}

export default AccountItem
