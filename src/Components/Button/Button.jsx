import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import style from './Button.module.scss'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function Button({
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
    className,
    leftIcon,
    children,
    onClick,
    ...passProps
}) {
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
        darkMode: useDarkMode(),
        primary,
        outline,
        small,
        large,
        text,
        disable,
        rounded,
    })

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
        </Component>
    )
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    text: PropTypes.bool,
    disable: PropTypes.string,
    rounded: PropTypes.bool,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    onClick: PropTypes.func,
}

export default React.memo(Button)
