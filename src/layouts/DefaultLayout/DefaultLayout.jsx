import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { useState, useEffect, useRef } from 'react'

import Header from '~/layouts/components/Header'
import SideBar from '../components/SlideBar'
import style from './DefaultLayout.module.scss'
import useDarkMode from '~/hooks/useDarkMode'
import { GoToTop } from '~/Components/Icons'

const cx = classNames.bind(style)

function DefaultLayout({ children }) {
    const [goToTop, setGoToTop] = useState(false)
    const hederIntoviewRef = useRef()

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            setGoToTop(scrollTop > 20)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleIntoView = () => {
        hederIntoviewRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        })
    }

    return (
        <div
            className={cx('wrapper', {
                darkMode: useDarkMode(),
            })}
        >
            <span className={cx('header-into-view')} ref={hederIntoviewRef}></span>
            <Header />
            <SideBar />
            <div className={cx('container')}>
                <div className={cx('content-wrapper')}>{children}</div>
                {goToTop && (
                    <button className={cx('go-to-top')} onClick={handleIntoView}>
                        <GoToTop />
                    </button>
                )}
            </div>
        </div>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultLayout
