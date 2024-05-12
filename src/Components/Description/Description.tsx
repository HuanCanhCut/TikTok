import classNames from 'classnames/bind'
import styles from './Description.module.scss'
import { Link } from 'react-router-dom'
import { UserModal } from '~/modal/modal'

interface Props {
    description: string
    user: UserModal
}

const cx = classNames.bind(styles)

const HightLightDescription: React.FC<Props> = ({ description, user }) => {
    const hightLightHashtag = () => {
        if (description.includes('#') || description.includes('http://') || description.includes('https://')) {
            const hashTag = description.split(' ')
            // eslint-disable-next-line array-callback-return
            const highlightedHashtag = hashTag.map((item, index) => {
                if (item.startsWith('http://') || item.startsWith('https://')) {
                    return (
                        <a
                            key={index}
                            href={item}
                            style={{ lineHeight: '22.3px', fontWeight: 700 }}
                            className={cx('hight-light')}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {item}
                        </a>
                    )
                }
                if (item.startsWith('#') || item.startsWith('@')) {
                    return item.startsWith('@') ? (
                        <Link
                            to={`/user/@${user.nickname}`}
                            style={{ marginRight: '4px' }}
                            key={index}
                            className={cx('hight-light', 'tag-account')}
                        >
                            {item}
                        </Link>
                    ) : (
                        <p style={{ marginRight: '4px' }} key={index} className={cx('hight-light')}>
                            {item}
                        </p>
                    )
                } else {
                    return (
                        <p style={{ marginRight: '4px' }} key={index}>
                            {item}
                        </p>
                    )
                }
            })
            return highlightedHashtag
        } else {
            return description
        }
    }

    return <div className={cx('description')}>{hightLightHashtag()}</div>
}

export default HightLightDescription
