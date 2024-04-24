import classNames from 'classnames/bind'
import style from './AccountItem.module.scss'
import { Link, To, LinkProps } from 'react-router-dom'
import Images from '~/Components/Images'
import BlueTick from '../BlueTick/BlueTick'
import { memo } from 'react'
import { UserModal } from '~/modal/modal'
import Follow from '../Follow'

const cx = classNames.bind(style)

type Props = {
    className?: any
    data: UserModal
    to?: To
    followBtn?: boolean
    onClick?: (nickname: string) => void
}

function AccountItem({ className, data, to, followBtn = false, onClick = () => {}, ...passProps }: Props) {
    let Component: string | typeof Link = 'div'

    const classes = cx('wrapper', {
        [className]: className,
    })

    const props: LinkProps = {
        ...passProps,
        to: to || '',
    }

    if (to) {
        Component = Link
    }

    const handleClick = () => {
        if (onClick && typeof data.nickname === 'string') {
            onClick(data.nickname)
        }
    }

    return (
        <div className={classes}>
            <Component className={cx('account-wrapper')} onClick={handleClick} {...props}>
                <Images className={cx('avatar')} src={data.avatar} alt="" />
                <div className={cx('Info')}>
                    <h4 className={cx('name')}>
                        <span>{`${data.first_name} ${data.last_name}`}</span>
                        {data.tick && <BlueTick />}
                    </h4>
                    <span className={cx('username')}>{data.nickname}</span>
                </div>
            </Component>
            {followBtn && <Follow data={data} className={cx('follow-btn')} />}
        </div>
    )
}

export default memo(AccountItem)
