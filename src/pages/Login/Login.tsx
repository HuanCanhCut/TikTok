import classNames from 'classnames/bind'
import style from './Login.module.scss'
import { currentUserData } from '~/App'
import Authen from '~/layouts/components/Authen'
import { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import useDarkMode from '~/hooks/useDarkMode'
import { useNavigate } from 'react-router-dom'
import config from '~/config'
import { Link } from 'react-router-dom'
import images from '~/assets/images'
import { sendEvent } from '~/helpers/event'

const cx = classNames.bind(style)

const Login: React.FC = () => {
    const darkMode = useDarkMode()
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        sendEvent({ eventName: 'auth:open-auth-modal', detail: true })

        return () => {
            sendEvent({ eventName: 'auth:open-auth-modal', detail: false })
        }
    }, [dispatch])

    useEffect(() => {
        if (currentUser && accessToken) {
            navigate(config.routes.home)
        }
    }, [currentUser, accessToken, navigate])

    return (
        <div className={cx('wrapper')}>
            <Link to={config.routes.home} className={cx('logo')}>
                <img src={darkMode ? images.lightLogo : images.darkLogo} alt="Logo" />
            </Link>
            <Authen />
        </div>
    )
}

export default Login
