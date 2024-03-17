import { UserModal } from '~/modal/modal'

interface InitState {
    currentUser: UserModal | null
}

const initialState: InitState = {
    currentUser: null,
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'auth':
            return {
                ...state,
                currentUser: action.payload,
            }
        case 'log-out':
            return {
                ...state,
                currentUser: action.payload,
            }
        default:
            return state
    }
}

export default authReducer
