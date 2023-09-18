import classNames from 'classnames/bind'

import Header from '~/Components/Layout/components/Header'
import SideBar from './SlideBar'
import style from './DefaultLayout.module.scss'

const cx = classNames.bind(style)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout
