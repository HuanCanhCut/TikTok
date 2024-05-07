import React, { memo, useEffect } from 'react'
import classNames from 'classnames/bind'

import Video from '~/layouts/components/Video'
import style from './Home.module.scss'

const cx = classNames.bind(style)

const Home: React.FC = memo(() => {
    useEffect(() => {
        document.title = 'TikTok - Make Your Day'
    }, [])

    return (
        <div className={cx('wrapper')}>
            <Video type="for-you" />
        </div>
    )
})

export default Home
