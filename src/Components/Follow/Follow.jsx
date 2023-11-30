import Button from '../Button'
import { useContext, memo, useState } from 'react'
import { currentUserData } from '~/App'
import { followAnUser, unFollowUser } from '~/services/userService'
import { updateContext } from '~/pages/Wrapper/Wrapper'
import Authen from '~/layouts/components/Authen'

function Follow({ data }) {
    const updateFollowed = useContext(updateContext)
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
                userId: data.id,
                accessToken,
            })

            // khi unFollow thì sẽ xóa id của người vừa được unFollow ra khỏi danh sách Followed temporary
            if (updateFollowed.followed.includes(response.data.id)) {
                const responseId = response.data.id
                const indexToRemove = updateFollowed.followed.indexOf(responseId)
                if (indexToRemove !== -1) {
                    updateFollowed.followed.splice(indexToRemove, 1)
                }
            }

            updateFollowed.temporaryUnFollow(response.data.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Authen isOpen={modalIsOpen} onClose={handleClose} />
            {data.id !== currentUser.id && (
                <>
                    {data.is_followed || updateFollowed.followed.includes(data.id) ? (
                        updateFollowed.unFollowed.includes(data.id) ? (
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
            )}
        </>
    )
}

export default memo(Follow)