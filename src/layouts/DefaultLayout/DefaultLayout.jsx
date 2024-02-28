import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import Header from '~/layouts/components/Header'
import SideBar from '../components/SlideBar'
import style from './DefaultLayout.module.scss'
import useDarkMode from '~/hooks/useDarkMode'
import { GoToTop } from '~/Components/Icons'

const cx = classNames.bind(style)

function DefaultLayout({ children }) {
    const [goToTop, setGoToTop] = useState()

    useEffect(() => {
        const handleScroll = (e) => {
            const scrollTop = e.target.scrollTop || window.scrollY

            setGoToTop(scrollTop > 200)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleGoToTop = () => {
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        })
    }

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

            <div
                className={cx('go-to-top', {
                    open: goToTop,
                })}
                onClick={handleGoToTop}
            >
                <GoToTop width="16" height="16" />
            </div>
        </div>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultLayout
