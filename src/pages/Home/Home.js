import { memo, useEffect, useState, useRef } from 'react'
import classNames from 'classnames/bind'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Virtuoso } from 'react-virtuoso'

import style from './Home.module.scss'
import Video from '~/layouts/components/Video'
import * as videoService from '~/services/videoService'
import { GoToTop } from '~/Components/Icons'
import useDarkMode from '~/hooks/useDarkMode'

const cx = classNames.bind(style)

const INIT_PAGE = 1
function Home() {
    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(INIT_PAGE)
    const [goToTop, setGoToTop] = useState(false)
    const headerIntoview = useRef()

    const handleGoToTop = () => {
        headerIntoview.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        })
    }

    useEffect(() => {
        ;(async () => {
            try {
                const response = await videoService.getVideo({
                    type: 'for-you',
                    page: page,
                })

                setVideos((prev) => {
                    return [...prev, ...response.data]
                })
            } catch (error) {
                console.log(error)
            }
        })()
    }, [page])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            setGoToTop(scrollTop > 10)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div
            className={cx('wrapper', {
                darkMode: useDarkMode(),
            })}
        >
            <Virtuoso
                data={videos}
                useWindowScroll
                endReached={() => {
                    setPage(page + 1)
                }}
                itemContent={(index, item) => {
                    return <Video key={index} data={item} />
                }}
                components={{
                    Header: () => {
                        return <div className={cx('header-intoview')} ref={headerIntoview}></div>
                    },
                    Footer: () => {
                        return (
                            <button className={cx('load-more')}>
                                <FontAwesomeIcon icon={faSpinner} />
                            </button>
                        )
                    },
                }}
            />

            {goToTop && (
                <button className={cx('go-to-top')} onClick={handleGoToTop}>
                    <GoToTop width="16px" height="16px" />
                </button>
            )}
        </div>
    )
}

export default memo(Home)
