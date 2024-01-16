import classNames from 'classnames/bind'
import { forwardRef } from 'react'
import style from './Input.module.scss'

const cx = classNames.bind(style)

function Input(
    {
        value,
        onChange = () => {},
        type = 'text',
        maxLength = Infinity,
        className,
        leftIcon,
        rightIcon,
        rightClick = () => {},
        ...passProps
    },
    ref
) {
    console.log('re-render')
    const classes = cx('wrapper', {
        [className]: className,
    })

    const props = {
        ...passProps,
        onChange,
        type,
    }

    return (
        <div className={classes}>
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            <input value={value} maxLength={maxLength} {...props} className={cx('input')} ref={ref} />
            {rightIcon && (
                <span className={cx('right-icon')} onClick={rightClick}>
                    {rightIcon}{' '}
                </span>
            )}
        </div>
    )
}

export default forwardRef(Input)
