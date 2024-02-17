import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './PreviewInfo.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, memo } from 'react'
import { currentUserData } from '~/App'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { fileNameContext } from '../../UploadPreview'

const cx = classNames.bind(style)

function PreviewInfo({ isPlay }) {
    const { fileName } = useContext(fileNameContext)
    const currentUser = useContext(currentUserData)

    return (
        <div className={cx('wrapper')}>
            <span className={cx('user-name')}>{`@ ${currentUser.data.first_name} ${currentUser.data.last_name}`}</span>
            <span className={cx('description')}>{fileName}</span>
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
    isPlay: PropTypes.bool,
}

export default memo(PreviewInfo)
