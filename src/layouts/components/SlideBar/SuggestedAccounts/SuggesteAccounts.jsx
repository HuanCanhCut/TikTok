import PropTypes from 'prop-types'
import { useEffect, useState, useContext } from 'react'
import classNames from 'classnames/bind'

import style from './SuggestedAccounts.module.scss'
import AccountItem from './AccountItem'
import * as useService from '~/services/userService'
import AccountLoading from '~/Components/AccountLoading'
import { currentUserData } from '~/App'

const cx = classNames.bind(style)

const PER_PAGE = 6

function SuggestedAccounts({ label }) {
    const [suggestedUser, setSuggestedUser] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    useEffect(() => {
        ;(async () => {
            const response = await useService.getSuggestedAccounts({
                page,
                perPage: PER_PAGE,
                accessToken,
            })

            setSuggestedUser((prev) => {
                return [...prev, ...response.data]
            })

            setLoading(false)
        })()
    }, [page, accessToken])

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
