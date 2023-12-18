import classNames from 'classnames/bind'
import style from './HeaderOnly.module.scss'
import Header from '~/layouts/components/Header'

const cx = classNames.bind(style)

function HeaderOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    )
}

export default HeaderOnly
