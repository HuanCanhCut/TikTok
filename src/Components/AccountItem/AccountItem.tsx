import classNames from 'classnames/bind'
import style from './AccountItem.module.scss'
import { Link, To, LinkProps } from 'react-router-dom'
import Images from '~/Components/Images'
import BlueTick from '../BlueTick/BlueTick'
import { memo } from 'react'
import { UserModal } from '~/modal/modal'

const cx = classNames.bind(style)

type Props = {
    data: UserModal
    to?: To
    onClick?: (nickname: string) => void
}

function AccountItem({ data, to, onClick = () => {}, ...passProps }: Props) {
    let Component: string | typeof Link = 'div'

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
        <Component className={cx('wrapper')} onClick={handleClick} {...props}>
            <Images className={cx('avatar')} src={data.avatar} alt="" />
            <div className={cx('Info')}>
                <h4 className={cx('name')}>
                    <span>{`${data.first_name} ${data.last_name}`}</span>
                    {data.tick && <BlueTick />}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Component>
    )
}

export default memo(AccountItem)
