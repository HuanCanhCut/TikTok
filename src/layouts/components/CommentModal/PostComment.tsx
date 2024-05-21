import classNames from 'classnames/bind'
import style from './CommentModal.module.scss'
import { useState } from 'react'
import * as commentService from '~/services/commentService'
import { useTranslation } from 'react-i18next'

import Button from '~/Components/Button'
import { VideoModal } from '~/modal/modal'
import { sendEvent } from '~/helpers/event'
import { showToast } from '~/project/services'

const cx = classNames.bind(style)

interface Props {
    currentVideo: VideoModal
}

const PostComment: React.FC<Props> = ({ currentVideo }) => {
    const { t } = useTranslation()
    const [commentValue, setCommentValue] = useState('')

    const handlePostComment = async () => {
        if (commentValue.length <= 0) {
            return
        }

        try {
            const response = await commentService.postComment({
                videoUuid: currentVideo.uuid,
                content: commentValue,
                accessToken: JSON.parse(localStorage.getItem('token')!),
            })

            if (response) {
                setCommentValue('')
                requestIdleCallback(() => {
                    sendEvent({ eventName: 'comment:post-comment', detail: response.data })
                })
                showToast({ message: t('comment.comment posted') })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handlePostComment()
        }
    }

    return (
        <div className={cx('add-comment-container')}>
            <textarea
                value={commentValue}
                className={cx('add-comment')}
                maxLength={150}
                onChange={(e) => {
                    setCommentValue(e.target.value)
                }}
                onKeyDown={handleKeyDown}
                placeholder={t('comment.add a comment')}
            ></textarea>
            <Button
                className={cx('post-comment-btn', {
                    active: commentValue.length > 0,
                })}
                onClick={handlePostComment}
            >
                {t('comment.post')}
            </Button>
        </div>
    )
}

export default PostComment
