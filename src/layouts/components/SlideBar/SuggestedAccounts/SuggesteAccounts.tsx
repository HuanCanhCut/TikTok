import React, { useEffect, useState, useContext } from 'react'
import classNames from 'classnames/bind'

import style from './SuggestedAccounts.module.scss'
import AccountItem from './AccountItem'
import * as useService from '~/services/userService'
import AccountLoading from '~/Components/AccountLoading'
import { currentUserData } from '~/App'
import { UserModal } from '~/modal/modal'

const cx = classNames.bind(style)

const PER_PAGE = 6

interface Props {
    label: string
}

const SuggestedAccounts: React.FC<Props> = ({ label }) => {
    const [suggestedUser, setSuggestedUser] = useState<UserModal[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    useEffect(() => {
        const getSuggestedAccounts = async () => {
            try {
                const response = await useService.getSuggestedAccounts({
                    page,
                    perPage: PER_PAGE,
                    accessToken,
                })

                if (response) {
                    setSuggestedUser((prev) => {
                        return [...prev, ...response.data]
                    })
                }

                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }

        getSuggestedAccounts()
    }, [page, accessToken])

    const onSeeMore = () => {
        setLoading(false)
        setPage(page + 1)
        setLoading(true)
    }

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {suggestedUser.map((account: UserModal) => {
                return <AccountItem data={account} key={account.id} />
            })}

            {loading && <AccountLoading />}

            <p className={cx('see-more')} onClick={onSeeMore}>
                See more
            </p>
        </div>
    )
}
export default SuggestedAccounts
