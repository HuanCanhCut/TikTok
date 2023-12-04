import Button from '../Button'
import { useContext, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { followAnUser, unFollowUser } from '~/services/userService'
import Authen from '~/layouts/components/Authen'
import { currentUserData } from '~/App'
import { temporaryFollowed, temporaryUnFollowed } from '~/redux/selectors'
import { actions } from '~/redux'

function Follow({ data }) {
    const dispatch = useDispatch()
    const temporaryFollowedList = useSelector(temporaryFollowed)
    const temporaryUnFollowedList = useSelector(temporaryUnFollowed)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    const handleClose = () => {
        setModalIsOpen(false)
    }

    const handleFollow = async () => {
        try {
            if (!accessToken && !currentUser) {
                setModalIsOpen(true)
                return
            }

            const response = await followAnUser({
                userId: data.id,
                accessToken,
            })

            // khi follow thì sẽ xóa id của người vừa được follow ra khỏi danh sách unFollowed temporary
            if (temporaryUnFollowedList.includes(response.data.id)) {
                const responseId = response.data.id
                const indexToRemove = temporaryUnFollowedList.indexOf(responseId)
                if (indexToRemove !== -1) {
                    temporaryUnFollowedList.splice(indexToRemove, 1)
                }
            }

            if (!temporaryUnFollowedList.includes(response.data.id)) {
                // updateFollowed.temporaryFollow(response.data.id)
                dispatch(actions.temporaryFollowed(response.data.id))
            }

            return response
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnFollow = async () => {
        try {
            const response = await unFollowUser({
                userId: data.id,
                accessToken,
            })

            // khi unFollow thì sẽ xóa id của người vừa được unFollow ra khỏi danh sách Followed temporary
            if (temporaryFollowedList.includes(response.data.id)) {
                const responseId = response.data.id
                const indexToRemove = temporaryFollowedList.indexOf(responseId)
                if (indexToRemove !== -1) {
                    temporaryFollowedList.splice(indexToRemove, 1)
                }
            }

            // updateFollowed.temporaryUnFollow(response.data.id)
            dispatch(actions.temporaryUnFollowed(response.data.id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Authen isOpen={modalIsOpen} onClose={handleClose} />

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
