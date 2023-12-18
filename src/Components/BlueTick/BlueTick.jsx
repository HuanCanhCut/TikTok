import classNames from 'classnames/bind'
import style from './BlueTick.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(style)

function BlueTick({ className }) {
    return (
        <span className={cx(style.wrapper, className)}>
            <FontAwesomeIcon icon={faCircleCheck} className={cx('icon', className)} />
        </span>
    )
}

export default BlueTick
