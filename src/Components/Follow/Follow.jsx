import Button from '../Button'
import { useContext, memo } from 'react'
import { currentUserData } from '~/App'
import { followAnUser, unFollowUser } from '~/services/userService'
import { updateContext } from '~/pages/Home/Home'
import { actions } from '~/redux'
import { useDispatch } from 'react-redux'

function Follow({ data }) {
    const dispatch = useDispatch()
    const update = useContext(updateContext)
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    const handleFollow = async () => {
        try {
            const response = await followAnUser({
                userId: data.user.id,
                accessToken,
            })

            // khi follow thì sẽ xóa id của người vừa được follow ra khỏi danh sách unFollowed temporary
            if (update.unFollowed.includes(response.data.id)) {
                const responseId = response.data.id
                const indexToRemove = update.unFollowed.indexOf(responseId)
                if (indexToRemove !== -1) {
                    update.unFollowed.splice(indexToRemove, 1)
                }
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

            // khi unFollow thì sẽ xóa id của người vừa được unFollow ra khỏi danh sách Followed temporary
            if (update.followed.includes(response.data.id)) {
                const responseId = response.data.id
                const indexToRemove = update.followed.indexOf(responseId)
                if (indexToRemove !== -1) {
                    update.followed.splice(indexToRemove, 1)
                }
            } else {
            }

            update.temporaryUnFollow(response.data.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {data.user.is_followed || update.followed.includes(data.user.id) ? (
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
