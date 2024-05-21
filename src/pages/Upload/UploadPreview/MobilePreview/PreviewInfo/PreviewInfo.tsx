import classNames from 'classnames/bind'
import style from './PreviewInfo.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, memo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { fileNameContext } from '../../UploadPreview'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { authCurrentUser } from '~/redux/selectors'
import { UserModal } from '~/modal/modal'

const cx = classNames.bind(style)

interface Props {
    isPlay: boolean | null
}

const PreviewInfo: React.FC<Props> = ({ isPlay }) => {
    const { t } = useTranslation()

    const fileNameModal = useContext(fileNameContext)
    const currentUser: UserModal = useSelector(authCurrentUser)

    return (
        <div className={cx('wrapper')}>
            <span className={cx('user-name')}>{`@ ${currentUser.first_name} ${currentUser.last_name}`}</span>
            <span className={cx('description')}>{fileNameModal?.fileName}</span>
            <div className={cx('music-container')}>
                <span className={cx('music-icon')}>
                    <FontAwesomeIcon icon={faMusic as IconProp} />
                </span>
                <div className={cx('marquee-container')}>
                    <span
                        className={cx('marquee', {
                            'marquee-paused': !isPlay,
                        })}
                    >
                        {`${currentUser.first_name} ${currentUser.last_name} ${t('upload.preview.original sound')} -- `}
                    </span>
                    <span
                        className={cx('marquee', {
                            'marquee-paused': !isPlay,
                        })}
                    >
                        {`${currentUser.first_name} ${currentUser.last_name} ${t('upload.preview.original sound')}`}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(PreviewInfo)
