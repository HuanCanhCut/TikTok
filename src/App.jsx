import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from '~/routes'
import { DefaultLayout } from './layouts'
import { createContext } from 'react'
import { useEffect } from 'react'
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
                        {publicRoutes.map((route, index) => {
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
                                            <Page />
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