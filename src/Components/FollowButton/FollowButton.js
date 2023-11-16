import React from 'react'
import PropTypes from 'prop-types'
import { useCallback } from 'react'

import Button from '~/Components/Button'
import * as userService from '~/services/userService'
import { AuthUserContext } from '~/App'
import { useState, useContext } from 'react'

function FollowButton({ data }) {
    const [isFollow, setIsFollow] = useState(data.is_followed)
    const currentUser = useContext(AuthUserContext)
    const userId = data.id
    const accessToken = currentUser && currentUser.meta.token

    const handleFollow = useCallback(async () => {
        const response = await userService.followAnUser({ userId, accessToken })
        if (response) {
            setIsFollow(true)
        }
    }, [userId, accessToken])

    const handleUnFollow = useCallback(async () => {
        const response = await userService.unFollowUser({ userId, accessToken })
        if (response) {
            setIsFollow(false)
        }
    }, [userId, accessToken])

    return (
        <>
            {isFollow ? (
                <Button rounded onClick={handleUnFollow}>
                    Following
                </Button>
            ) : (
                <Button outline onClick={handleFollow}>
                    Follow
                </Button>
            )}
        </>
    )
}

FollowButton.propTypes = {
    data: PropTypes.object.isRequired,
}

export default React.memo(FollowButton)
