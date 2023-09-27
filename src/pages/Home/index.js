import style from './Home.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

function Home() {
    return (
        <div className={cx('wrapper')}>
            <h2>Home page</h2>
        </div>
    )
}

export default Home
