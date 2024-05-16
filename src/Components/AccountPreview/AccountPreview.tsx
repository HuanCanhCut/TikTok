import classNames from 'classnames/bind'
import style from './AccountPreview.module.scss'
import Follow from '../Follow'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import BlueTick from '~/Components/BlueTick/BlueTick'
import Image from '~/Components/Images'
import { UserModal } from '~/modal/modal'

const cx = classNames.bind(style)

interface Props {
    data: UserModal
}

function AccountPreview({ data }: Props) {
    const { t } = useTranslation()

    return (
        <div className={cx('preview')}>
            <header className={cx('header')}>
                <Link to={`/user/@${data.nickname}`}>
                    <Image className={cx('avatar')} src={data.avatar} alt="" />
                </Link>
                <Follow data={data} />
            </header>
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <Link to={`/user/@${data.nickname}`}>
                        <p className={cx('nickname')}>
                            <span>{data.nickname}</span>
                            <span className={cx('icon')}>{data.tick && <BlueTick />}</span>
                        </p>
                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </Link>
                </div>
                <p className={cx('analytics')}>
                    <div className={cx('analytics-item')}>
                        <span className={cx('value')}>{data.followings_count}</span>
                        <span className={cx('followers')}>Followers</span>
                    </div>
                    <div className={cx('analytics-item')}>
                        <span className={cx('value')}>{data.followers_count}</span>
                        <span className={cx('likes')}>{t('account preview.likes')}</span>
                    </div>
                </p>
            </div>
        </div>
    )
}

export default AccountPreview
