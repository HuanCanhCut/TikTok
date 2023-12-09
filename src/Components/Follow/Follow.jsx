import Button from '../Button'
import { useContext, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeDuplicate } from '~/hooks/removeDuplicate'

import { followAnUser, unFollowUser } from '~/services/userService'
import { currentUserData } from '~/App'
import { temporaryFollowed, temporaryUnFollowed } from '~/redux/selectors'
import { actions } from '~/redux'

function Follow({ data }) {
    const dispatch = useDispatch()
    let temporaryFollowedList = useSelector(temporaryFollowed)
    const temporaryUnFollowedList = useSelector(temporaryUnFollowed)
    const [isCallingApi, setIsCallingApi] = useState(false)

    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    const handleFollow = async () => {
        if (isCallingApi) {
            return
        }

        setIsCallingApi(true)

        try {
            if (!accessToken && !currentUser) {
                dispatch(actions.openAuth(true))
                return
            }

            const response = await followAnUser({
                userId: data.id,
                accessToken,
            })

            // khi follow thì sẽ xóa id của người vừa được follow ra khỏi danh sách unFollowed temporary
            if (response) {
                removeDuplicate(temporaryUnFollowedList, response.data.id)
                if (!temporaryUnFollowedList.includes(response.data.id)) {
                    dispatch(actions.temporaryFollowed(response.data.id))
                }
            }

            return response
        } catch (error) {
            console.log(error)
        } finally {
            setIsCallingApi(false)
        }
    }

    const handleUnFollow = async () => {
        if (isCallingApi) {
            return
        }

        setIsCallingApi(true)

        try {
            const response = await unFollowUser({
                userId: data.id,
                accessToken,
            })

            // khi unFollow thì sẽ xóa id của người vừa được unFollow ra khỏi danh sách Followed temporary
            if (response) {
                removeDuplicate(temporaryFollowedList, response.data.id)
                dispatch(actions.temporaryUnFollowed(response.data.id))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsCallingApi(false)
        }
    }

    return (
        <>
            {currentUser || accessToken ? (
                data.id !== currentUser.data.id && (
                    <>
                        {data.is_followed || temporaryFollowedList.includes(data.id) ? (
                            temporaryUnFollowedList.includes(data.id) ? (
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
            ) : (
                <>
                    <Button outline onClick={handleFollow}>
                        Follow
                    </Button>
                </>
            )}
        </>
    )
}

export default memo(Follow)
