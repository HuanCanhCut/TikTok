import classNames from 'classnames/bind'
import style from './NotFound.module.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import config from '~/config'

const cx = classNames.bind(style)

function NotFound() {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('noise')}></div>
            <div className={cx('"overlay"')}></div>
            <div className={cx('terminal')}>
                <h1 className={cx('error-404')}>
                    Error <span className={cx('errorcode')}>404</span>
                </h1>
                <p className={cx('output')}>
                    The page you are looking for might have been removed, had its name changed or is temporarily
                    unavailable.
                </p>
                <p className={cx('output')}>
                    Please try to{' '}
                    <button onClick={goBack} className={cx('navigate')}>
                        GO BACK
                    </button>{' '}
                    or{' '}
                    <Link className={cx('navigate')} to={config.routes.home}>
                        RETURN TO HOME PAGE
                    </Link>
                    .
                </p>
                <p className={cx('output')}>Good luck.</p>
            </div>
        </div>
    )
}

export default NotFound
