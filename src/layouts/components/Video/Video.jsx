import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { memo, useEffect } from 'react'

import style from './Video.module.scss'
import Header from './Header'
import VideoItem from '~/Components/VideoItem'

const cx = classNames.bind(style)

function Video({ data, videos, virtuosoRef, setFocusedIndex, focusedIndex }) {
    const scrollToIndex = (index) => {
        virtuosoRef.current.scrollToIndex({ index: index, align: 'center', behavior: 'smooth' })
    }

    useEffect(() => {
        const handleClickKeys = (e) => {
            if (e.key === 'ArrowDown' && focusedIndex < videos.length - 1) {
                e.preventDefault()
                const nextIndex = focusedIndex + 1
                setFocusedIndex(nextIndex)
                scrollToIndex(nextIndex)
            }

            if (e.key === 'ArrowUp' && focusedIndex !== 0) {
                e.preventDefault()
                const prevIndex = focusedIndex - 1
                setFocusedIndex(prevIndex)
                scrollToIndex(prevIndex)
            }

            if (e.key === 'End' || e.key === 'Home' || e.which === 32 || e.which === 33 || e.which === 34) {
                e.preventDefault()
            }
        }

        window.addEventListener('keydown', handleClickKeys)

        return () => {
            window.removeEventListener('keydown', handleClickKeys)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusedIndex, videos.length])

    return (
        <div className={cx('wrapper')}>
            <Header data={data} />
            <VideoItem video={data} />
        </div>
    )
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
}

export default memo(Video)
