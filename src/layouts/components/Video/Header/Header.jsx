import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { useSpring, motion } from 'framer-motion'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

import style from './Header.module.scss'
import Image from '~/Components/Images/Image'
import BlueTick from '~/Components/BlueTick/BlueTick'
import { Wrapper as PopperWrapper } from '~/Components/Popper'
import AccountPreview from '~/Components/AccountPreview'
import Follow from '~/Components/Follow'

const cx = classNames.bind(style)

function Header({ data }) {
    const [highlightedDescription, setHighlightedDescription] = useState('')

    useEffect(() => {
        if (data.description.includes('#')) {
            const hashTag = data.description.split(' ')
            // eslint-disable-next-line array-callback-return
            const highlightedHashtag = hashTag.map((item, index) => {
                if (item.startsWith('#')) {
                    return <p key={index} className={cx('hashtag')}>{`${item}`}</p>
                } else {
                    const chars = item.split('')
                    if (chars.includes('#')) {
                        const hashTagIndex = chars.indexOf('#')
                        const hashTag = chars.slice(0, hashTagIndex)
                        hashTag.map((item, index) => {
                            return <p key={index} className={cx('hashtag')}>{`${item}`}</p>
                        })
                    } else {
                        return <p key={index}>{item}</p>
                    }
                }
            })
            setHighlightedDescription(highlightedHashtag)
        } else {
            setHighlightedDescription(data.description)
        }
    }, [data.description])

    const dataUser = data.user

    const springConfig = { damping: 15, stiffness: 300 }
    const initialScale = 0.5
    const opacity = useSpring(springConfig)
    const scale = useSpring(initialScale, springConfig)

    const renderPreview = (attrs) => {
        return (
            <motion.div style={{ scale, opacity }} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </motion.div>
        )
    }

    const handleMount = () => {
        scale.set(1)
        opacity.set(1)
    }

    const handleHide = ({ unmount }) => {
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
                <Link to={`@${dataUser.nickname}`}>
                    <Image className={cx('avatar')} src={dataUser.avatar} alt="" />
                </Link>
            </Tippy>
            <div className={cx('body')}>
                <Link to={`@${dataUser.nickname}`} className={cx('user-info')}>
                    <div className={cx('nick-name')}>
                        <strong>
                            <h3 className={cx('nick-name')}>{dataUser.nickname}</h3>
                        </strong>
                    </div>
                    <div className={cx('full-name')}>{`${data.user.first_name} ${data.user.last_name}`}</div>
                    {dataUser.check && <BlueTick />}
                </Link>
                <div className={cx('description')}>{highlightedDescription}</div>
                {data.music && (
                    <p className={cx('music-name')}>
                        <FontAwesomeIcon icon={faMusic} className={cx('music-icon')} />
                        {data.music}
                    </p>
                )}
            </div>
            <Follow data={data} />
        </div>
    )
}

Header.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Header
