import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import style from './SuggestedAccounts.module.scss'
import AccountItem from './AccountItem'
import * as useService from '~/services/userService'
import AccountLoading from '~/Components/AccountLoading'

const cx = classNames.bind(style)

const PER_PAGE = 6
const SUGGESTED_PAGES_KEY = 'SuggestedAccountsPage'
const TOTAL_SUGGESTED_ACCOUNT_PAGES = JSON.parse(localStorage.getItem(SUGGESTED_PAGES_KEY))
const INIT_PAGE = Math.floor(Math.random() * TOTAL_SUGGESTED_ACCOUNT_PAGES) || 1

function SuggestedAccounts({ label }) {
    const [suggestedUser, setSuggestedUser] = useState([])
    const [page, setPage] = useState(INIT_PAGE)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            try {
                const response = await useService.getSuggested(page, PER_PAGE)

                localStorage.setItem(SUGGESTED_PAGES_KEY, JSON.stringify(response.meta.pagination.total_pages))

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
        setPage((prev) => {
            do {
                return Math.floor(Math.random() * TOTAL_SUGGESTED_ACCOUNT_PAGES)
            } while (prev === Math.floor(Math.random() * TOTAL_SUGGESTED_ACCOUNT_PAGES))
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

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
}

export default SuggestedAccounts
