import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import style from './SuggestedAccounts.module.scss'
import AccountItem from './AccountItem'
import * as useService from '~/services/userService'
import AccountLoading from '~/Components/AccountLoading'
import Wrapper from '~/pages/Wrapper'

const cx = classNames.bind(style)

const PER_PAGE = 6

function SuggestedAccounts({ label }) {
    const [suggestedUser, setSuggestedUser] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            const response = await useService.getSuggestedAccounts({
                page,
                perPage: PER_PAGE,
            })

            setSuggestedUser((prev) => {
                return [...prev, ...response.data]
            })

            setLoading(false)
        })()
    }, [page])

    const onSeeMore = () => {
        setLoading(false)
        setPage(page + 1)
        setLoading(true)
    }

    return (
        <Wrapper>
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
        </Wrapper>
    )
}
SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
}
export default SuggestedAccounts
