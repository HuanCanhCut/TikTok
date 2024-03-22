import classNames from 'classnames/bind'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Button from '~/Components/Button'
import SwitchButton from '~/Components/SwitchButton'
import style from './Menu.module.scss'
import { actions } from '~/redux'
import { To } from 'react-router-dom'

const cx = classNames.bind(style)

interface PropsData {
    title: string
    switch?: boolean
    separate?: boolean
    to?: To
    icon: React.ReactNode
}

interface Props {
    data: PropsData
    onClick?: () => void
}

const MenuItem: React.FC<Props> = ({ data, onClick }) => {
    const { t } = useTranslation()
    const [isOn, setIsOn] = useState(JSON.parse(localStorage.getItem('darkMode')!) || false)

    const dispatch = useDispatch()

    const classes = cx('menu-item', {
        separate: data.separate,
    })

    const handleToggleDarkMode = () => {
        setIsOn(!isOn)
        localStorage.setItem('darkMode', isOn.toString())
    }

    useEffect(() => {
        dispatch(actions.darkMode(isOn))
    }, [dispatch, isOn])

    return (
        <Button className={classes} to={data.to} leftIcon={data.icon} onClick={onClick}>
            {t(`header.${data.title.toLowerCase()}`)}
            {data.switch && <SwitchButton isOn={isOn} onClick={handleToggleDarkMode} className={cx('switch-btn')} />}
        </Button>
    )
}

export default MenuItem
