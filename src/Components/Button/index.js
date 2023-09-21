import classNames from 'classnames/bind'
import style from './Button.module.scss'
import { Link } from 'react-router-dom'

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
            <span>{children}</span>
        </Component>
    )
}

export default Button
