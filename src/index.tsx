import ReactDOM from 'react-dom/client'
import GlobalStyle from './Components/GlobalStyles'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
    // <React.StrictMode>
    <GlobalStyle>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
        <ToastContainer />
    </GlobalStyle>
    /* </React.StrictMode> */
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
