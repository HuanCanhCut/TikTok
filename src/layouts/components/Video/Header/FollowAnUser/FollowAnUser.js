import React from 'react'
import classNames from 'classnames/bind'
import style from './FollowAnUser.module.scss'

import Button from '~/Components/Button'
import * as userService from '~/services/userService'
import { AuthUserContext } from '~/App'
import { useState, useContext } from 'react'

const cx = classNames.bind(style)

function FollowAnUser({ data }) {
    const [isFollow, setIsFollow] = useState(data.is_followed)
    const currentUser = useContext(AuthUserContext)
    const userId = data.id
    const accessToken = currentUser && currentUser.meta.token

    const handleFollow = async () => {
        const response = await userService.followAnUser({ userId, accessToken })
        if (response) {
            setIsFollow(true)
        }
    }

    const handleUnFollow = async () => {
        const response = await userService.unFollowUser({ userId, accessToken })
        if (response) {
            setIsFollow(false)
        }
    }

    return (
        <>
            {isFollow ? (
                <Button rounded className={cx('follow')} onClick={handleUnFollow}>
                    Following
                </Button>
            ) : (
                <Button outline className={cx('follow')} onClick={handleFollow}>
                    Follow
                </Button>
            )}
        </>
    )
}

export default React.memo(FollowAnUser)
