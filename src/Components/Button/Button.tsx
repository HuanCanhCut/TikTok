import React, { forwardRef } from 'react'
import { Link, LinkProps, To } from 'react-router-dom'
import classNames from 'classnames/bind'
import useDarkMode from '~/hooks/useDarkMode'
import style from './Button.module.scss'

const cx = classNames.bind(style)

interface Props {
    to?: To
    primary?: boolean
    outline?: boolean
    small?: boolean
    large?: boolean
    text?: boolean
    disable?: boolean
    rounded?: boolean
    iconBtn?: boolean
    login?: boolean
    roundedOutline?: boolean
    leftIcon?: React.ReactNode
    children: React.ReactNode | string
    className?: any
    onClick?: () => void
}

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>(
    (
        {
            to,
            primary = false,
            outline = false,
            small = false,
            large = false,
            text = false,
            disable = false,
            rounded = false,
            login = false,
            roundedOutline = false,
            iconBtn = false,
            className,
            leftIcon,
            children,
            onClick,
            ...passProps
        },
        ref
    ) => {
        let Component: any = 'button'

        const props: LinkProps = {
            onClick,
            to: to || '',
            ...passProps,
        }

        if (to) {
            Component = Link
        }

        const classes = cx('wrapper', {
            [className]: className,
            primary,
            outline,
            small,
            large,
            text,
            disable,
            iconBtn,
            rounded,
            roundedOutline,
            darkMode: useDarkMode(),
        })

        return (
            <Component className={classes} {...props} ref={ref}>
                {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                <span className={cx('title')}>{children}</span>
            </Component>
        )
    }
)

export default Button
