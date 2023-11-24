import Button from '../Button'
import { useContext, memo, useState } from 'react'
import { currentUserData } from '~/App'
import { followAnUser, unFollowUser } from '~/services/userService'
import { updateContext } from '~/pages/Home/Home'

function Follow({ data }) {
    const [isFollow, setIsFollow] = useState(data.user.is_followed)
    const update = useContext(updateContext)
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    const handleFollow = async () => {
        try {
            const response = await followAnUser({
                userId: data.user.id,
                accessToken,
            })

            if (update.unFollowed.includes(response.data.id)) {
                const responseId = response.data.id
                const indexToRemove = update.unFollowed.indexOf(responseId)
                if (indexToRemove !== -1) {
                    update.unFollowed.splice(indexToRemove, 1)
                }
                localStorage.setItem('unFollowed', JSON.stringify(update.unFollowed))
            }

            if (!update.unFollowed.includes(response.data.id)) {
                update.temporaryFollow(response.data.id)
            }

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

            if (update.followed.includes(response.data.id)) {
                const responseId = response.data.id
                const indexToRemove = update.followed.indexOf(responseId)
                if (indexToRemove !== -1) {
                    update.followed.splice(indexToRemove, 1)
                }
                localStorage.setItem('followed', JSON.stringify(update.followed))
            } else {
            }

            update.temporaryUnFollow(response.data.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {isFollow || update.followed.includes(data.user.id) ? (
                update.unFollowed.includes(data.user.id) ? (
                    <Button outline onClick={handleFollow}>
                        Follow
                    </Button>
                ) : (
                    <Button rounded onClick={handleUnFollow}>
                        Following
                    </Button>
                )
            ) : (
                <Button outline onClick={handleFollow}>
                    Follow
                </Button>
            )}
        </>
    )
}

export default memo(Follow)
