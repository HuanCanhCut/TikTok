import classNames from 'classnames/bind'
import style from './Header.module.scss'
import EditCard from './EditCard'
import SplitCard from './SplitCard'
import { memo } from 'react'

const cx = classNames.bind(style)

function Header() {
    return (
        <div className={cx('wrapper')}>
            <EditCard />
            <SplitCard />
        </div>
    )
}

export default memo(Header)
