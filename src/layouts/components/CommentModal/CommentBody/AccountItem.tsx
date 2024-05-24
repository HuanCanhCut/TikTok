import classNames from 'classnames/bind'
import style from './CommentBody.module.scss'
import { CommentModal, VideoModal } from '~/modal/modal'
import { Link } from 'react-router-dom'
import Images from '~/Components/Images'
import BlueTick from '~/Components/BlueTick/BlueTick'
import PopperEffect from '~/Components/PopperEffect'
import AccountPreview from '~/Components/AccountPreview'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    comment: CommentModal
    currentVideo: VideoModal
}

const cx = classNames.bind(style)

const AccountItem: React.FC<Props> = ({ comment, currentVideo }) => {
    const { t } = useTranslation()

    const renderPreview = useCallback(() => {
        return <AccountPreview data={comment.user} />
    }, [comment.user])

    return (
        <div className={cx('account-container')}>
            <Link to={`/user/@${comment.user.nickname}`}>
                <PopperEffect renderItem={renderPreview} timeDelayOpen={400} placement="bottom-start" offsetY={4}>
                    <Images className={cx('avatar')} src={comment.user.avatar} alt="" />
                </PopperEffect>
            </Link>
            <div className={cx('info')}>
                <Link to={`/user/@${comment.user.nickname}`}>
                    <h4 className={cx('name')}>
                        <span>{`${comment.user.first_name} ${comment.user.last_name}`}</span>
                        {comment.user.tick && <BlueTick />}
                        {currentVideo.user.id === comment.user.id && (
                            <span className={cx('creator')}>·{t('comment.creator')}</span>
                        )}
                    </h4>
                </Link>
                <p className={cx('comment-value')}>{comment.comment}</p>
                <span className={cx('date')}>{comment.created_at.split(' ')[0]}</span>
            </div>
        </div>
    )
}

export default AccountItem
