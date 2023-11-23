import Button from '../Button'
import { useState, useContext, memo, useEffect } from 'react'
import { currentUserData } from '~/App'
import { followAnUser, unFollowUser, getAnUser } from '~/services/userService'
import { updateContext } from '~/pages/Home/Home'

function Follow({ data }) {
    const update = useContext(updateContext)
    const [isFollow, setIsFollow] = useState(data.user.is_followed)
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    const handleFollow = async () => {
        try {
            const response = await followAnUser({
                userId: data.user.id,
                accessToken,
            })

            setIsFollow(true)
            update.temporaryFollow(response.data.id)

            return response
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnFollow = async () => {
        try {
            const response = await unFollowUser({
                userId: data.user.id,
                accessToken,
            })

            if (response) {
                setIsFollow(false)
            }

            if (update.followed.includes(response.data.id)) {
                const responseId = response.data.id
                const indexToRemove = update.followed.indexOf(responseId)
                if (indexToRemove !== -1) {
                    update.followed.splice(indexToRemove, 1)
                }
                localStorage.setItem('followed', JSON.stringify(update.followed))
            }
            update.temporaryUnFollow(response.data.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {data.user.is_followed ||
            isFollow ||
            (update.followed.includes(data.user.id) && update.followed.includes(data.user.id)) ? (
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

export default memo(Follow)
