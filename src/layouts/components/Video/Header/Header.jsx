import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { useSpring, motion } from 'framer-motion'
import { useState, useContext } from 'react'

import { currentUserData } from '~/App'
import style from './Header.module.scss'
import Image from '~/Components/Images/Image'
import BlueTick from '~/Components/BlueTick/BlueTick'
import { Wrapper as PopperWrapper } from '~/Components/Popper'
import AccountPreview from '~/Components/AccountPreview'
import Button from '~/Components/Button'
import { followAnUser, unFollowUser } from '~/services/userService'

const cx = classNames.bind(style)

function Header({ data }) {
    const dataUser = data.user
    const [isFollow, setIsFollow] = useState(data.user.is_followed)
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token

    const springConfig = { damping: 15, stiffness: 300 }
    const initialScale = 0.5
    const opacity = useSpring(springConfig)
    const scale = useSpring(initialScale, springConfig)

    const handleFollow = async () => {
        try {
            const response = await followAnUser({
                userId: data.id,
                accessToken,
            })

            console.log(response)

            if (response.data.is_followed) {
                setIsFollow(true)
            }

            return response
        } catch (error) {
            console.log(error)
        }
    }

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
                    <strong>
                        <h3 className={cx('nick-name')}>{dataUser.nickname}</h3>
                    </strong>
                    {dataUser.check && <BlueTick />}
                </Link>
                <p className={cx('description')}>{data.description}</p>
            </div>

            {data.user.is_followed || isFollow ? (
                <Button rounded>Following</Button>
            ) : (
                <Button outline onClick={handleFollow}>
                    Follow
                </Button>
            )}
        </div>
    )
}

Header.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Header
