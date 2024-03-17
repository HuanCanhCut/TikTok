import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { allRoutes } from '~/routes'
import { DefaultLayout } from './layouts'
import { useEffect } from 'react'

import './Components/GlobalStyles/GlobalStyles.scss'
import useDarkMode from './hooks/useDarkMode'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from './redux'
import { getCurrentUser } from './services/authService'
import { authCurrentUser } from './redux/selectors'
import config from './config'

function App() {
    const dispatch = useDispatch()
    const darkMode = useDarkMode()
    const token = JSON.parse(localStorage.getItem('token')!)

    useEffect(() => {
        if (!token) {
            dispatch(actions.currentUser(null))
            return
        }

        const handleGetCurrentUser = async () => {
            const response = await getCurrentUser({
                accessToken: token,
            })
            if (response) {
                dispatch(actions.currentUser(response.data))
            }
        }

        handleGetCurrentUser()
    }, [dispatch, token])

    const currentUser = useSelector(authCurrentUser)

    useEffect(() => {
        document.documentElement.setAttribute('data-darkmode', darkMode.toString())
    }, [darkMode])

    return (
        <Router>
            <div className="App">
                <Routes>
                    {allRoutes.map((route, index) => {
                        const Page = route.component

                        let Layout = DefaultLayout

                        if (route.layout) {
                            Layout = route.layout
                        } else if (route.layout === null) {
                            Layout = Fragment
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        {/* If it is privateRoutes, it will check if you are not logged in and route to the login page */}
                                        {route.private ? (
                                            !!currentUser ? (
                                                <Page />
                                            ) : (
                                                <Navigate to={config.routes.login} />
                                            )
                                        ) : (
                                            <Page />
                                        )}
                                    </Layout>
                                }
                            />
                        )
                    })}
                </Routes>
            </div>
        </Router>
    )
}

export default App
