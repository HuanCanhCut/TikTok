import Button from '~/Components/Button'
import classNames from 'classnames/bind'
import style from './Menu.module.scss'

const cx = classNames.bind(style)

function MenuItem({ data }) {
    return (
        <Button className={cx('menu-item')} to={data.to} leftIcon={data.icon} style={{ marginLeft: 0 }}>
            {data.title}
        </Button>
    )
}

export default MenuItem
