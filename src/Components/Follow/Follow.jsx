import Button from '../Button'
import { useContext, memo } from 'react'
import { currentUserData } from '~/App'
import { followAnUser, unFollowUser } from '~/services/userService'
import { updateContext } from '~/pages/Wrapper/Wrapper'

function Follow({ data }) {
    const updateFollowed = useContext(updateContext)
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    const handleFollow = async () => {
        try {
            const response = await followAnUser({
                userId: data.user.id,
                accessToken,
            })

            // khi follow thì sẽ xóa id của người vừa được follow ra khỏi danh sách unFollowed temporary
            if (updateFollowed.unFollowed.includes(response.data.id)) {
                const responseId = response.data.id
                const indexToRemove = updateFollowed.unFollowed.indexOf(responseId)
                if (indexToRemove !== -1) {
                    updateFollowed.unFollowed.splice(indexToRemove, 1)
                }
            }

            if (!updateFollowed.unFollowed.includes(response.data.id)) {
                updateFollowed.temporaryFollow(response.data.id)
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

            // khi unFollow thì sẽ xóa id của người vừa được unFollow ra khỏi danh sách Followed temporary
            if (updateFollowed.followed.includes(response.data.id)) {
                const responseId = response.data.id
                const indexToRemove = updateFollowed.followed.indexOf(responseId)
                if (indexToRemove !== -1) {
                    updateFollowed.followed.splice(indexToRemove, 1)
                }
            } else {
            }

            updateFollowed.temporaryUnFollow(response.data.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {data.user.is_followed || updateFollowed.followed.includes(data.user.id) ? (
                updateFollowed.unFollowed.includes(data.user.id) ? (
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
