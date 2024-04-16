import classNames from 'classnames/bind'
import style from './Profile.module.scss'
import { memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UserProfile from './UserProfile'
import { authCurrentUser } from '~/redux/selectors'
import { getAnUser } from '~/services/userService'
import { UserModal } from '~/modal/modal'
import Loading from '~/Components/Loading'

const cx = classNames.bind(style)

const Profile: React.FC = () => {
    const { pathname } = useLocation()
    const [userProfile, setUserProfile] = useState<UserModal | null>(null)
    const currentUser = useSelector(authCurrentUser)
    const accessToken = JSON.parse(localStorage.getItem('token')!)

    useEffect(() => {
        try {
            const getUserProfile = async () => {
                setUserProfile(null)
                const nickname = pathname.replace('/user/', '')
                const { data } = await getAnUser({ nickname: nickname, accessToken: accessToken })
                setUserProfile(data)
            }

            getUserProfile()
        } catch (error) {
            console.log(error)
        }
    }, [pathname, accessToken])

    return (
        <div className={cx('wrapper')}>
            {userProfile ? (
                <UserProfile currentUser={currentUser} userProfile={userProfile} />
            ) : (
                <div className={cx('loading-container')}>
                    <Loading />
                </div>
            )}
        </div>
    )
}

export default memo(Profile)
