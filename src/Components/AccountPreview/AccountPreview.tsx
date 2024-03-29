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
                            <strong>{data.nickname}</strong>
                            <span className={cx('icon')}>{data.tick && <BlueTick />}</span>
                        </p>
                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </Link>
                </div>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followings_count}</strong>
                    <span>Followers</span>
                    <strong className={cx('value')}>{data.followers_count}</strong>
                    <span>{t('preview.likes')}</span>
                </p>
            </div>
        </div>
    )
}

export default AccountPreview
