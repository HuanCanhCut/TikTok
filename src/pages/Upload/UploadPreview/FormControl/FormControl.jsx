import classNames from 'classnames/bind'
import style from './FormControl.module.scss'
import Caption from './Caption'

const cx = classNames.bind(style)

function FormControl() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Caption></Caption>
            </div>
        </div>
    )
}

export default FormControl
