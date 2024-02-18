import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Button from '~/Components/Button'
import SwitchButton from '~/Components/SwitchButton'
import style from './Menu.module.scss'
import { actions } from '~/redux'

const cx = classNames.bind(style)

function MenuItem({ data, onClick }) {
    const [isOn, setIsOn] = useState(JSON.parse(localStorage.getItem('darkMode') || false))
    const dispatch = useDispatch()

    const classes = cx('menu-item', {
        separate: data.separate,
    })

    const handleToggleDarkMode = () => {
        setIsOn(!isOn)
    }

    useEffect(() => {
        dispatch(actions.darkMode(isOn))
    }, [dispatch, isOn])

    return (
        <Button className={classes} to={data.to} leftIcon={data.icon} style={{ marginLeft: 0 }} onClick={onClick}>
            {data.title}
            {data.switch && <SwitchButton isOn={isOn} onClick={handleToggleDarkMode} className={cx('switch-btn')} />}
        </Button>
    )
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

export default MenuItem
