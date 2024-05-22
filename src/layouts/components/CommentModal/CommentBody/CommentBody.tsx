import classNames from 'classnames/bind'
import style from './CommentBody.module.scss'
import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '~/Components/Button'
import { CommentModal, VideoModal } from '~/modal/modal'
import * as commentService from '~/services/commentService'
import AccountItem from './AccountItem'
import { Ellipsis, HeartOutLine } from '~/Components/Icons'
import DeleteModal from '~/Components/DeleteModal'
import { showToast } from '~/project/services'
import Loading from '~/Components/Loading'
import { authCurrentUser } from '~/redux/selectors'
import { useSelector } from 'react-redux'
import { listentEvent } from '~/helpers/event'

const cx = classNames.bind(style)

interface Props {
    currentVideo: VideoModal
}

const CommentBody: React.FC<Props> = ({ currentVideo }) => {
    const { t } = useTranslation()

    const currentUser = useSelector(authCurrentUser)

    const [currentTab, setCurrentTab] = useState<'comments' | 'creator'>('comments')
    const [comments, setComments] = useState<CommentModal[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const accessToken = JSON.parse(localStorage.getItem('token')!)

    const underLineRef = useRef<HTMLDivElement | null>(null)
    const commentListRef = useRef<HTMLDivElement | null>(null)
    const totalCommentPage = useRef<number>(0)

    useEffect(() => {
        const remove = listentEvent({
            eventName: 'comment:post-comment',
            handler({ detail: comment }) {
                setComments((prev) => {
                    return [comment, ...prev]
                })
            },
        })

        return remove
    }, [])

    useEffect(() => {
        const remove = listentEvent({
            eventName: 'comment:load-more-comment',
            handler() {
                if (totalCommentPage.current > page) {
                    setPage(page + 1)
                }
            },
        })

        return remove
    }, [page])

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await commentService.getComments({
                    videoID: currentVideo.id,
                    accessToken: accessToken,
                    page,
                })

                if (response) {
                    setComments((prev) => {
                        return [...prev, ...response.data]
                    })

                    totalCommentPage.current = response.meta.pagination.total_pages
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getComments()

        return () => {
            setLoading(true)
        }
    }, [accessToken, currentVideo.id, page])

    useEffect(() => {
        setComments([])
        setPage(1)
    }, [currentVideo.id])

    useEffect(() => {
        if (underLineRef.current) {
            underLineRef.current.style.left = currentTab === 'comments' ? '0%' : '50%'
        }
    }, [currentTab, currentVideo.comments_count])

    interface Tabs {
        type: 'comments' | 'creator'
        title: string
    }

    const tabs: Tabs[] = useMemo(() => {
        return [
            {
                type: 'comments',
                title: t('comment.comments'),
            },
            {
                type: 'creator',
                title: t('comment.creator videos'),
            },
        ]
    }, [t])

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
                }
            } catch (error) {
                console.log(error)
            }
        },
        [accessToken, comments, t]
    )

    return (
        <div className={cx('wrapper')}>
            <div className={cx('tabs-container')}>
                <div className={cx('tabs')}>
                    {tabs.map((tab) => (
                        <Button
                            key={tab.type}
                            className={cx('tab-btn', {
                                active: currentTab === tab.type,
                            })}
                            onClick={() => setCurrentTab(tab.type)}
                        >
                            {tab.title}
                        </Button>
                    ))}
                    <div className={cx('under-line')} ref={underLineRef}></div>
                </div>
            </div>
            <div className={cx('comment-body')} ref={commentListRef}>
                {currentTab === 'comments' && (
                    <div className={cx('comment-list')}>
                        {comments.map((comment: CommentModal, index) => (
                            <div key={index} className={cx('comment-item')}>
                                <AccountItem comment={comment} />

                                <div className={cx('commnet-options')}>
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
                                    <span>
                                        <HeartOutLine className={cx('heart-icon')} />
                                    </span>
                                    <span className={cx('like-count')}>{comment.likes_count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {currentTab === 'creator' && <div className={cx('creator-list')}>video</div>}
                {loading && (
                    <div className={cx('loading-container')}>
                        <Loading />
                    </div>
                )}
            </div>
        </div>
    )
}
export default memo(CommentBody)
