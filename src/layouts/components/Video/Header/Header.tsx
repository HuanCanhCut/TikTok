import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { useSpring, motion } from 'framer-motion'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './Header.module.scss'
import Image from '~/Components/Images/Image'
import BlueTick from '~/Components/BlueTick/BlueTick'
import { Wrapper as PopperWrapper } from '~/Components/Popper'
import AccountPreview from '~/Components/AccountPreview'
import Follow from '~/Components/Follow'
import { VideoModal } from '~/modal/modal'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const cx = classNames.bind(style)

interface Props {
    data: VideoModal
}

const Header: React.FC<Props> = ({ data }) => {
    const springConfig: any = { damping: 15, stiffness: 300 }
    const initialScale = 0.5
    const opacity = useSpring(springConfig)
    const scale = useSpring(initialScale, springConfig)

    const renderPreview = (attrs: any) => {
        return (
            <motion.div style={{ scale, opacity }} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <AccountPreview data={data.user} />
                </PopperWrapper>
            </motion.div>
        )
    }

    const hightLightHashtag = () => {
        if (
            data.description.includes('#') ||
            data.description.includes('http://') ||
            data.description.includes('https://')
        ) {
            const hashTag = data.description.split(' ')
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
                            to={`/user/@${data.user.nickname}`}
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
            // setHighlightedDescription(highlightedHashtag)
            return highlightedHashtag
        } else {
            // setHighlightedDescription(data.description)
            return data.description
        }
    }

    const handleMount = () => {
        scale.set(1)
        opacity.set(1)
    }

    const handleHide = ({ unmount }: { unmount: any }) => {
        scale.on('change', (value) => {
            if (value <= initialScale) {
                unmount()
            }
        })

        scale.set(initialScale)
        opacity.set(0)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <Tippy
                    animation={true}
                    interactive
                    placement="bottom-start"
                    delay={[600, 200]}
                    onMount={handleMount}
                    onHide={handleHide}
                    render={renderPreview}
                    appendTo={document.body}
                >
                    <Link to={`/user/@${data.user.nickname}`}>
                        <Image className={cx('avatar')} src={data.user.avatar} alt="" />
                    </Link>
                </Tippy>
                <div className={cx('body')}>
                    <Link to={`/user/@${data.user.nickname}`} className={cx('user-info')}>
                        <h3 className={cx('nick-name')}>
                            {data.user.nickname}
                            {data.user.tick && <BlueTick />}
                        </h3>

                        <h4 className={cx('full-name')}>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                    </Link>
                    <div className={cx('description')}>{hightLightHashtag()}</div>
                    {data.music && (
                        <p className={cx('music-name')}>
                            <FontAwesomeIcon icon={faMusic as IconProp} className={cx('music-icon')} />
                            {data.music}
                        </p>
                    )}
                </div>
            </div>
            <Follow data={data.user} />
        </div>
    )
}

export default Header
