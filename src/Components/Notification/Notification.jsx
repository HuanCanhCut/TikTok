import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import style from './Notification.module.scss'
import Image from '~/Components/Images/Image'
import BlueTick from '~/Components/BlueTick/BlueTick'
import useDarkMode from '~/hooks/useDarkMode'
import { Wrapper as PopperWrapper } from '../Popper'

const cx = classNames.bind(style)

function Notification({ title, content, author = 'Trọng Huấn', path, closeModal }) {
    return (
        <PopperWrapper
            className={cx('wrapper', {
                darkMode: useDarkMode(),
            })}
        >
            <h1 className={cx('heading')}>Thông báo</h1>
            <div className={cx('body')}>
                <p className={cx('title')}>
                    <span className={cx('hashtag')}>#</span>
                    {title}
                </p>
                <p className={cx('content')}>{content}</p>
                <Image src={path} alt="" className={cx('image')} />
            </div>
            <p className={cx('author')}>
                <span className={cx('upload-by')}>Đăng bởi:</span> {`${author}`}
                <BlueTick className={cx('check-icon')} />
            </p>
            <button className={cx('close')} onClick={closeModal}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </PopperWrapper>
    )
}

Notification.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    path: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
}

export default Notification
