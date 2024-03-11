import classNames from 'classnames/bind'
import { ChangeEvent, forwardRef } from 'react'
import style from './Input.module.scss'

const cx = classNames.bind(style)

interface Props {
    value: string | number
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    type?: string
    maxLength?: number
    className?: string | any
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    onClickRightIcon: () => void
}

const Input = forwardRef<any, Props>(
    (
        {
            value,
            onChange = () => {},
            type = 'text',
            maxLength = Infinity,
            className,
            leftIcon,
            rightIcon,
            onClickRightIcon = () => {},
            ...passProps
        },
        ref
    ) => {
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
                    <span className={cx('right-icon')} onClick={onClickRightIcon}>
                        {rightIcon}{' '}
                    </span>
                )}
            </div>
        )
    }
)

export default Input
