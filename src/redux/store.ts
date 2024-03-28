import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './reducers/auth'
import tempReducer from './reducers/temp'
import projectReducer from './reducers/project'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
}

const rootReducer: any = combineReducers({
    auth: authReducer,
    temp: tempReducer,
    project: projectReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)

export default store

export const persistor = persistStore(store)
