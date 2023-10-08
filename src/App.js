import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from '~/routes'
import { DefaultLayout } from './layouts'
import { createContext } from 'react'

export const AuthUserContext = createContext()

function App() {
    const authUser = JSON.parse(localStorage.getItem('user'))

    return (
        <AuthUserContext.Provider value={authUser}>
            <Router>
                <div className="App">
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
        </AuthUserContext.Provider>
    )
}

export default App
