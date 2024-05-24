import classNames from 'classnames/bind'
import style from './CommentBody.module.scss'
import { useSelector } from 'react-redux'

import * as commentService from '~/services/commentService'
import { authCurrentUser } from '~/redux/selectors'
import { Ellipsis, HeartOutLine } from '~/Components/Icons'
import DeleteModal from '~/Components/DeleteModal'
import { CommentModal } from '~/modal/modal'
import { useCallback, useState } from 'react'
import { showToast } from '~/project/services'
import { useTranslation } from 'react-i18next'
import { sendEvent } from '~/helpers/event'

interface Props {
    comment: CommentModal
    comments: CommentModal[]
    setComments: React.Dispatch<React.SetStateAction<CommentModal[]>>
}

const cx = classNames.bind(style)

const Options: React.FC<Props> = ({ comment, comments, setComments }) => {
    const { t } = useTranslation()
    const currentUser = useSelector(authCurrentUser)

    const [isLiked, setIsLiked] = useState(comment.is_liked)
    const [commentLikesCount, setCommentLikesCount] = useState(comment.likes_count)

    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const handleLikeComment = async ({ commentID }: { commentID: number }) => {
        try {
            setIsLiked(true)
            setCommentLikesCount(commentLikesCount + 1)
            const response = await commentService.likeComment({
                commentID,
                accessToken,
            })

            if (!response) {
                setIsLiked(false)
                setCommentLikesCount(commentLikesCount - 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnlikeComment = async ({ commentID }: { commentID: number }) => {
        try {
            setIsLiked(false)
            setCommentLikesCount(commentLikesCount - 1)
            const response = await commentService.unLikeComment({
                commentID,
                accessToken,
            })
            if (!response) {
                setIsLiked(true)
                setCommentLikesCount(commentLikesCount + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleToggleLike = async ({ commentID }: { commentID: number }) => {
        isLiked ? handleUnlikeComment({ commentID }) : handleLikeComment({ commentID })
    }

    const handleDeleteComment = useCallback(
        async (comment: CommentModal) => {
            try {
                const response = await commentService.deleteComment({
                    commentID: comment.id,
                    accessToken: accessToken,
                })
                if (response?.status === 200 || response?.status === 204) {
                    showToast({ message: t('comment.delete comment successfully') })

                    const newComments = comments.filter((item) => item.id !== comment.id)
                    setComments(newComments)
                    sendEvent({ eventName: 'comment:load-comments-count', detail: 'sub' })
                }
            } catch (error) {
                console.log(error)
            }
        },
        [accessToken, comments, setComments, t]
    )

    return (
        <div className={cx('comment-options')}>
            <DeleteModal
                handleDelete={() => {
                    handleDeleteComment(comment)
                }}
                firstOption="Report"
                title="Are you sure you want to delete this comment?"
                deleteBtn={comment.user.id === currentUser.id}
                timeDelayOpen={300}
                timeDelayClose={100}
            >
                <Ellipsis className={cx('more-options')} width="20" height="20" />
            </DeleteModal>
            <div
                onClick={() => {
                    handleToggleLike({ commentID: comment.id })
                }}
            >
                <HeartOutLine className={cx('heart-icon', { liked: isLiked })} />
            </div>
            <span className={cx('like-count')}>{commentLikesCount}</span>
        </div>
    )
}

export default Options
