import classNames from 'classnames/bind'
import style from './Loading.module.scss'

const cx = classNames.bind(style)

const Loading: React.FC = () => {
    return (
        <div className={cx('tiktok-spinner')}>
            <div className={cx('ball', 'red')}></div>
            <div className={cx('ball', 'blue')}></div>
        </div>
    )
}

export default Loading
