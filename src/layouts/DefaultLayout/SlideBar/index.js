import classNames from 'classnames/bind'
import style from './SideBar.module.scss'

const cx = classNames.bind(style)

function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            <h2>sidebar</h2>
        </aside>
    )
}

export default SideBar
