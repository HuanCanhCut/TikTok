import PropTypes from 'prop-types'
import { useEffect, useState, useContext } from 'react'
import style from './FollowingAccounts.module.scss'
import classNames from 'classnames/bind'
import AccountItem from './AccountItem'
import * as useService from '~/services/userService'
import AccountLoading from '~/Components/AccountLoading'
import { currentUserData } from '~/App'

const cx = classNames.bind(style)

function SuggestedAccounts({ label }) {
    const currentUser = useContext(currentUserData)
    const [suggestedUser, setSuggestedUser] = useState([])
    const [page, setPage] = useState(1)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            try {
                const response = await useService.getFollowingAccounts(page, currentUser.meta.token)

                setSuggestedUser((prevUser) => {
                    return [...prevUser, ...response.data]
                })
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [page])

    const onSeeMore = () => {
        setLoading(false)
        setPage(page + 1)
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

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
}

export default SuggestedAccounts
