import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import style from './SuggestedAccounts.module.scss'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import { useSpring, motion } from 'framer-motion'

import AccountPreview from './AccountPreview'
import { Wrapper as PopperWrapper } from '~/Components/Popper'
import Image from '~/Components/Images'

const cx = classNames.bind(style)

function AccountItem({ data }) {
    const springConfig = { damping: 15, stiffness: 300 }
    const initialScale = 0.5
    const opacity = useSpring(springConfig)
    const scale = useSpring(initialScale, springConfig)

    const renderPreview = (attrs) => {
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

    const onHide = ({ unmount }) => {
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
                delay={[800, 50]}
                placement="bottom"
                render={renderPreview}
                onHide={onHide}
                onMount={onMount}
                hideOnClick={false}
            >
                <div className={cx('account-item')}>
                    <Image className={cx('avatar')} src={data.avatar} alt="" />
                    <div className={cx('account-info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            <span className={cx('icon')}>{data.tick && <FontAwesomeIcon icon={faCheckCircle} />}</span>
                        </p>
                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    )
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountItem
