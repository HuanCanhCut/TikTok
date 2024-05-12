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
import HightLightDescription from '~/Components/Description/Description'

const cx = classNames.bind(style)

interface Props {
    data: VideoModal
    type: string
}

const Header: React.FC<Props> = ({ data, type }) => {
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

                    <HightLightDescription description={data.description} user={data.user} />
                    {data.music && (
                        <p className={cx('music-name')}>
                            <FontAwesomeIcon icon={faMusic as IconProp} className={cx('music-icon')} />
                            {data.music}
                        </p>
                    )}
                </div>
            </div>
            {type !== 'following' && <Follow data={data.user} />}
        </div>
    )
}

export default Header
