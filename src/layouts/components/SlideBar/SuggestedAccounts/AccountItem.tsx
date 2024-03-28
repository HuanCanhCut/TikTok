import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import { useSpring, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { Wrapper as PopperWrapper } from '~/Components/Popper'
import AccountPreview from '~/Components/AccountPreview'
import style from './SuggestedAccounts.module.scss'
import Image from '~/Components/Images'
import { UserModal } from '~/modal/modal'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const cx = classNames.bind(style)

interface Props {
    data: UserModal
}

const AccountItem: React.FC<Props> = ({ data }) => {
    const springConfig: any = { damping: 15, stiffness: 300 }
    const initialScale = 0.5
    const opacity = useSpring(springConfig)
    const scale = useSpring(initialScale, springConfig)

    const renderPreview = (attrs: any) => {
        return (
            <motion.div style={{ scale, opacity }}>
                <div className="wrapper" tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <AccountPreview data={data} />
                    </PopperWrapper>
                </div>
            </motion.div>
        )
    }

    const onMount = () => {
        scale.set(1)
        opacity.set(1)
    }

    const onHide = ({ unmount }: { unmount: any }) => {
        scale.on('change', (value) => {
            if (value <= initialScale) {
                unmount()
            }
        })

        scale.set(initialScale)
        opacity.set(0)
    }

    return (
        // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <Tippy
                animation={true}
                interactive
                delay={[800, 30]}
                placement="bottom"
                render={renderPreview}
                onHide={onHide}
                onMount={onMount}
                hideOnClick={false}
            >
                <Link to={`/user/@${data.nickname}`}>
                    <div className={cx('account-item')}>
                        <Image className={cx('avatar')} src={data.avatar} alt="" />
                        <div className={cx('account-info')}>
                            <p className={cx('nickname')}>
                                <span>{data.nickname}</span>
                                <span className={cx('icon')}>
                                    {data.tick && <FontAwesomeIcon icon={faCheckCircle as IconProp} />}
                                </span>
                            </p>
                            <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                        </div>
                    </div>
                </Link>
            </Tippy>
        </div>
    )
}

export default AccountItem
