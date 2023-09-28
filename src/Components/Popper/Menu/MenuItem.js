import PropTypes from 'prop-types'
import Button from '~/Components/Button'
import classNames from 'classnames/bind'
import style from './Menu.module.scss'

const cx = classNames.bind(style)

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    })

    return (
        <Button className={classes} to={data.to} leftIcon={data.icon} style={{ marginLeft: 0 }} onClick={onClick}>
            {data.title}
        </Button>
    )
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

export default MenuItem
