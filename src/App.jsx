import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { allRoutes } from '~/routes'
import { DefaultLayout } from './layouts'
import { useEffect, createContext } from 'react'
import { useDispatch } from 'react-redux'

import './Components/GlobalStyles/GlobalStyles.scss'
import useDarkMode from './hooks/useDarkMode'

export const currentUserData = createContext()

function App() {
    const dispatch = useDispatch()
    const authUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const handleUnload = () => {
            localStorage.removeItem('firstNotification')
            localStorage.removeItem('pageIndexes')
        }

        window.addEventListener('beforeunload', handleUnload)

        return () => {
            window.removeEventListener('beforeunload', handleUnload)
        }
    }, [dispatch])

    return (
        <currentUserData.Provider value={authUser}>
            <Router>
                <div className="App" data-darkmode={useDarkMode()}>
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
                                                !!authUser ? (
                                                    <Page />
                                                ) : (
                                                    <Navigate to={route.redirectTo} />
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
        </currentUserData.Provider>
    )
}

export default App
