import PropTypes from 'prop-types'
import { useEffect, useState, useContext } from 'react'
import style from './FollowingAccounts.module.scss'
import classNames from 'classnames/bind'
import AccountItem from '~/Components/AccountItem'
import * as useService from '~/services/userService'
import AccountLoading from '~/Components/AccountLoading'
import { currentUserData } from '~/App'
import { useSelector } from 'react-redux'
import { updateFollowListSelector } from '~/redux/selectors'

const cx = classNames.bind(style)

function FollowingAccounts({ label }) {
    const updateFollowList = useSelector(updateFollowListSelector)
    const currentUser = useContext(currentUserData)
    const [suggestedUser, setSuggestedUser] = useState([])
    const [page, setPage] = useState(1)
    const [prevPage, setPrevPage] = useState(page)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            try {
                const response = await useService.getFollowingAccounts(page, currentUser.meta.token)

                setSuggestedUser((prevUser) => {
                    if (page === prevPage) {
                        return [...response.data]
                    } else {
                        return [...prevUser, ...response.data]
                    }
                })
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, updateFollowList])

    const onSeeMore = () => {
        setLoading(false)
        setPage((prev) => {
            setPrevPage(prev)
            return prev + 1
        })
        setLoading(true)
    }

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {suggestedUser.map((account) => {
                return <AccountItem data={account} key={account.id} />
            })}

            {loading && <AccountLoading />}
            <p className={cx('see-more')} onClick={onSeeMore}>
                See more
            </p>
        </div>
    )
}

FollowingAccounts.propTypes = {
    label: PropTypes.string.isRequired,
}

export default FollowingAccounts
