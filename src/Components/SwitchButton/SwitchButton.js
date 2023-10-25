import classNames from 'classnames/bind'
import style from './SwitchButton.module.scss'
import { motion } from 'framer-motion'
import { actions } from '~/redux'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

const cx = classNames.bind(style)

function SwitchButton() {
    const dispatch = useDispatch()
    const [isOn, setIsOn] = useState(JSON.parse(localStorage.getItem('da  ') || false))

    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
    }

    const handleToggleSwitch = () => {
        setIsOn((prev) => {
            return !prev
        })
    }

    useEffect(() => {
        dispatch(actions.da(isOn))
    }, [isOn])

    return (
        <span className={cx('switch')} onClick={handleToggleSwitch} data-ison={isOn}>
            <motion.span className={cx('switch-core')} layout transition={spring}></motion.span>
        </span>
    )
}

export default SwitchButton
