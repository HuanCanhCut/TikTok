import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import Header from '~/layouts/components/Header'
import SideBar from '../components/SlideBar'
import style from './DefaultLayout.module.scss'

const cx = classNames.bind(style)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <SideBar />
            <div className={cx('container')}>
                <div className={cx('content-wrapper')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultLayout
