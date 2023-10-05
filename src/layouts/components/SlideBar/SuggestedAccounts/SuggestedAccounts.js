import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import style from './SuggestedAccounts.module.scss'
import AccountItem from './AccountItem'
import * as useService from '~/services/userService'
import AccountLoading from '~/Components/AccountLoading'

const cx = classNames.bind(style)

const INIT_PAGE = 1
const PER_PAGE = 6

function SuggestedAccounts({ label }) {
    const [suggestedUser, setSuggestedUser] = useState([])
    const [page, setPage] = useState(INIT_PAGE)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            try {
                const response = await useService.getSuggested(page, PER_PAGE)

                setSuggestedUser((prevUser) => {
                    return [...prevUser, ...response]
                })
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [page])

    const onSeeMore = () => {
        setPage(page + 1)
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
