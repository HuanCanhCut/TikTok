import classNames from 'classnames/bind'
import style from './Login.module.scss'
import Authen from '~/layouts/components/Authen'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDarkMode from '~/hooks/useDarkMode'
import { useNavigate } from 'react-router-dom'
import config from '~/config'
import { Link } from 'react-router-dom'
import images from '~/assets/images'
import { sendEvent } from '~/helpers/event'
import { UserModal } from '~/modal/modal'
import { authCurrentUser } from '~/redux/selectors'

const cx = classNames.bind(style)

const Login: React.FC = () => {
    const darkMode = useDarkMode()
    const currentUser: UserModal = useSelector(authCurrentUser)
    const accessToken = JSON.parse(localStorage.getItem('token')!)
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
