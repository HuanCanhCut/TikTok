import classNames from 'classnames/bind'
import style from './Popper.module.scss'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

interface Props {
    children: React.ReactNode
    className?: string
}

const Wrapper: React.FC<Props> = ({ children, className }) => {
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

export default Wrapper
