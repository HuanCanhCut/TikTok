import classNames from 'classnames/bind'
import style from './AccountItem.module.scss'
import Images from '~/Components/Images'
import { UserModal } from '~/modal/modal'
import BlueTick from '~/Components/BlueTick/BlueTick'
import Follow from '~/Components/Follow'

const cx = classNames.bind(style)

interface Props {
    data: UserModal
    className?: any
}

const AccountItem: React.FC<Props> = ({ data, className, ...passProps }) => {
    const props = {
        ...passProps,
    }

    const classes = cx('wrapper', {
        [className]: className,
    })

    return (
        <div className={classes} {...props}>
            <Images className={cx('avatar')} src={data.avatar} alt="" />
            <div className={cx('Info')}>
                <h4 className={cx('name')}>
                    <span>{`${data.first_name} ${data.last_name}`}</span>
                    {data.tick && <BlueTick />}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
            <Follow data={data} className={cx('follow-btn')} />
        </div>
    )
}

export default AccountItem
