import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './Popper.module.scss'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function Wrapper({ children, className }) {
    return (
        <div
            className={cx(
                'wrapper',
                {
                    darkMode: useDarkMode(),
                },
                className
            )}
        >
            {children}
        </div>
    )
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
}

export default Wrapper
