import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import Header from '~/layouts/components/Header'
import SideBar from '../components/SlideBar'
import style from './DefaultLayout.module.scss'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

function DefaultLayout({ children }) {
    return (
        <div
            className={cx('wrapper', {
                darkMode: useDarkMode(),
            })}
        >
            <Header />
            <SideBar />
            <div className={cx('container')}>
                <div className={cx('content-wrapper')}>{children}</div>
            </div>
        </div>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultLayout
