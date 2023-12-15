import classNames from 'classnames/bind'
import style from './Login.module.scss'
import { currentUserData } from '~/App'
import Authen from '~/layouts/components/Authen'
import { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '~/redux'
import useDarkMode from '~/hooks/useDarkMode'
import { useNavigate } from 'react-router-dom'
import config from '~/config'
import { Link } from 'react-router-dom'
import images from '~/assets/images'

const cx = classNames.bind(style)

function Login() {
    const darkMode = useDarkMode()
    const currentUser = useContext(currentUserData)
    const accessToken = currentUser && currentUser.meta.token
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.openAuth(true))

        return () => {
            dispatch(actions.openAuth(false))
        }
    }, [dispatch])

    useEffect(() => {
        if (currentUser && accessToken) {
            navigate(config.routes.home)
        }
    }, [currentUser, accessToken, navigate])

    return (
        <div
            className={cx('wrapper', {
                darkMode: useDarkMode(),
            })}
        >
            <Link to={config.routes.home} className={cx('logo')}>
                <img src={darkMode ? images.lightLogo : images.darkLogo} alt="Logo" />
            </Link>
            <Authen />
        </div>
    )
}

export default Login
