import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './PreviewInfo.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, memo } from 'react'
import { fileUploadContext } from '~/pages/Upload/Upload'
import { currentUserData } from '~/App'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(style)

function PreviewInfo({ isPlay }) {
    const currentFile = useContext(fileUploadContext)
    const currentUser = useContext(currentUserData)

    return (
        <div className={cx('wrapper')}>
            <span className={cx('user-name')}>{`@ ${currentUser.data.first_name} ${currentUser.data.last_name}`}</span>
            <span className={cx('description')}>{currentFile.file.name}</span>
            <div className={cx('music-container')}>
                <span className={cx('music-icon')}>
                    <FontAwesomeIcon icon={faMusic} />
                </span>
                <div className={cx('marquee-container')}>
                    <span
                        className={cx('marquee', {
                            // stop marquee animation
                            'marquee-paused': !isPlay,
                        })}
                    >
                        {`${currentUser.data.first_name} ${currentUser.data.last_name} Original sound -- `}
                    </span>
                    <span
                        className={cx('marquee', {
                            // stop marquee animation
                            'marquee-paused': !isPlay,
                        })}
                    >
                        {`${currentUser.data.first_name} ${currentUser.data.last_name} Original sound`}
                    </span>
                </div>
            </div>
        </div>
    )
}

PreviewInfo.propTypes = {
    isPlay: PropTypes.bool.isRequired,
}

export default memo(PreviewInfo)
