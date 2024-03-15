import classNames from 'classnames/bind'
import style from './BlueTick.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const cx = classNames.bind(style)

type Props = {
    className?: any
}

function BlueTick({ className }: Props) {
    return (
        <span
            className={cx('wrapper', {
                [className]: className,
            })}
        >
            <FontAwesomeIcon icon={faCircleCheck as IconProp} className={cx('icon')} />
        </span>
    )
}

export default BlueTick
