import React from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { forwardRef } from 'react'

import style from './Button.module.scss'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function Button(
    {
        to,
        href,
        primary = false,
        outline = false,
        small = false,
        large = false,
        text = false,
        disable = false,
        rounded = false,
        login = false,
        roundedOutline = false,
        className,
        leftIcon,
        children,
        onClick,

        ...passProps
    },
    ref
) {
    let Component = 'button'
    const props = {
        onClick,
        ...passProps,
    }

    // remove event listener when btn is disable
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    if (to) {
        props.to = to
        Component = Link
    } else if (href) {
        props.href = href
        Component = 'a'
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        small,
        large,
        text,
        disable,
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

export default React.memo(forwardRef(Button))
