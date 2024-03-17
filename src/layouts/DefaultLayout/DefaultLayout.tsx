import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import Header from '~/layouts/components/Header'
import SideBar from '../components/SlideBar'
import style from './DefaultLayout.module.scss'
import { GoToTop } from '~/Components/Icons'

const cx = classNames.bind(style)

interface Props {
    children: React.ReactNode
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
    const [goToTop, setGoToTop] = useState(false)

    useEffect(() => {
        const handleUnload = () => {
            localStorage.removeItem('pageVideoIndexes')
        }

        window.addEventListener('beforeunload', handleUnload)

        return () => {
            window.removeEventListener('beforeunload', handleUnload)
        }
    }, [])

    useEffect(() => {
        const handleScroll = (e: any) => {
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
        <div className={cx('wrapper')}>
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

export default DefaultLayout
