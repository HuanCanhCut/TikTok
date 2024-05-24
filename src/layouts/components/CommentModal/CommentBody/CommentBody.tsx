import classNames from 'classnames/bind'
import style from './CommentBody.module.scss'
import { useEffect, useMemo, useRef, useState, memo } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '~/Components/Button'
import { CommentModal, VideoModal } from '~/modal/modal'
import * as commentService from '~/services/commentService'
import AccountItem from './AccountItem'
import { Lock } from '~/Components/Icons'
import Loading from '~/Components/Loading'
import { listentEvent } from '~/helpers/event'
import Options from './Options'

const cx = classNames.bind(style)

interface Props {
    currentVideo: VideoModal
}

const CommentBody: React.FC<Props> = ({ currentVideo }) => {
    const { t } = useTranslation()

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
            if (!currentVideo.allows.includes('comment')) {
                return
            }

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
    }, [accessToken, currentVideo.allows, currentVideo.id, page])

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
                        {currentVideo.allows.includes('comment') ? (
                            comments.map((comment: CommentModal, index) => (
                                <div key={index} className={cx('comment-item')}>
                                    <AccountItem comment={comment} currentVideo={currentVideo} />
                                    <Options comment={comment} comments={comments} setComments={setComments} />
                                </div>
                            ))
                        ) : (
                            <div className={cx('comment-disable')}>
                                <Lock width="70" height="70" className={cx('lock-icon')} />
                                <span>{t('comment.comment disabled')}</span>
                            </div>
                        )}
                    </div>
                )}
                {currentTab === 'creator' && <div className={cx('creator-list')}>video</div>}
                {loading && currentVideo.allows.includes('comment') && (
                    <div className={cx('loading-container')}>
                        <Loading />
                    </div>
                )}
            </div>
        </div>
    )
}
export default memo(CommentBody)
