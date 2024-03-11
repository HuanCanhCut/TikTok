import classNames from 'classnames/bind'
import style from './BlueTick.module.scss'
import { CircleBlue } from '../Icons'

const cx = classNames.bind(style)

type Props = {
    className?: string
}

function BlueTick({ className }: Props) {
    return (
        <span className={cx('wrapper')}>
            <CircleBlue className={cx(className)}></CircleBlue>
        </span>
    )
}

export default BlueTick
