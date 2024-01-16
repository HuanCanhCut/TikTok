import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './AccountItem.module.scss'
import { Link } from 'react-router-dom'
import Images from '~/Components/Images'
import BlueTick from '../BlueTick/BlueTick'
import { memo } from 'react'

const cx = classNames.bind(style)

function AccountItem({ data, to, onClick = () => {}, ...passProps }) {
    let Component = 'div'
    const props = {
        ...passProps,
    }
    if (to) {
        Component = Link
        props.to = to
    }

    const handleClick = () => {
        onClick(data.nickname)
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

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
    to: PropTypes.node,
}

export default memo(AccountItem)
