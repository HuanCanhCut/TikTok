import classNames from 'classnames/bind'
import style from './PreviewInfo.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, memo } from 'react'
import { currentUserData } from '~/App'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { fileNameContext } from '../../UploadPreview'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const cx = classNames.bind(style)

interface Props {
    isPlay: boolean
}

const PreviewInfo: React.FC<Props> = ({ isPlay }) => {
    const fileNameModal = useContext(fileNameContext)
    const currentUser = useContext(currentUserData)

    return (
        <div className={cx('wrapper')}>
            <span className={cx('user-name')}>{`@ ${currentUser.data.first_name} ${currentUser.data.last_name}`}</span>
            <span className={cx('description')}>{fileNameModal?.fileName}</span>
            <div className={cx('music-container')}>
                <span className={cx('music-icon')}>
                    <FontAwesomeIcon icon={faMusic as IconProp} />
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

export default memo(PreviewInfo)
