import classNames from 'classnames/bind'
import style from './BlueTick.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(style)

function BlueTick() {
    return (
        <span>
            <FontAwesomeIcon icon={faCircleCheck} className={cx('icon')} />
        </span>
    )
}

export default BlueTick
