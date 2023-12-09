import { memo } from 'react'
import classNames from 'classnames/bind'

import Video from '~/layouts/components/Video'
import style from './Home.module.scss'

const cx = classNames.bind(style)

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Video type="for-you" />
        </div>
    )
}

export default memo(Home)
