import Button from '~/Components/Button'
import classNames from 'classnames/bind'
import style from './Menu.module.scss'

const cx = classNames.bind(style)

function MenuItem({ data, onClick }) {
    return (
        <Button
            className={cx('menu-item')}
            to={data.to}
            leftIcon={data.icon}
            style={{ marginLeft: 0 }}
            onClick={onClick}
        >
            {data.title}
        </Button>
    )
}

export default MenuItem
