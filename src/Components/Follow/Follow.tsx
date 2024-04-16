import Button from '../Button'
import classNames from 'classnames/bind'
import style from './Following.module.scss'
import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { handleFollowAnUser, handleUnFollowAnUser } from '~/project/services'
import { authCurrentUser, temporaryFollowed, temporaryUnFollowed } from '~/redux/selectors'
import { UserModal } from '~/modal/modal'

interface Props {
    data: UserModal
    className?: any
}

const cx = classNames.bind(style)

const Follow = ({ data, className }: Props) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const temporaryFollowedList: number[] = useSelector(temporaryFollowed)
    const temporaryUnFollowedList: number[] = useSelector(temporaryUnFollowed)
    const [isCallingApi, setIsCallingApi] = useState(false)

    const classes = cx({
        [className]: className,
    })

    const currentUser: UserModal = useSelector(authCurrentUser)
    const accessToken: string = JSON.parse(localStorage.getItem('token')!)

    const handleFollow = async () => {
        handleFollowAnUser({
            accessToken,
            isCallingApi,
            temporaryUnFollowedList: temporaryUnFollowedList,
            user: data,
            dispatch: dispatch,
            currentUser: currentUser,
            setIsCallingApi,
        })
    }

    const handleUnFollow = async () => {
        handleUnFollowAnUser({
            accessToken,
            isCallingApi,
            temporaryFollowedList: temporaryFollowedList,
            user: data,
            dispatch: dispatch,
            currentUser: currentUser,
            setIsCallingApi,
        })
    }

    return (
        <>
            {currentUser || accessToken ? (
                data.id !== currentUser.id && (
                    <>
                        {data.is_followed || temporaryFollowedList.includes(data.id) ? (
                            temporaryUnFollowedList.includes(data.id) ? (
                                <Button outline onClick={handleFollow} className={classes}>
                                    {t('videos.follow')}
                                </Button>
                            ) : (
                                <Button rounded onClick={handleUnFollow} className={classes}>
                                    {t('videos.following')}
                                </Button>
                            )
                        ) : (
                            <Button outline onClick={handleFollow} className={classes}>
                                {t('videos.follow')}
                            </Button>
                        )}
                    </>
                )
            ) : (
                <>
                    <Button outline onClick={handleFollow} className={classes}>
                        {t('videos.follow')}
                    </Button>
                </>
            )}
        </>
    )
}

export default memo(Follow)
