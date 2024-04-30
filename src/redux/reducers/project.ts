interface Theme {
    darkMode: boolean
}

interface InitState {
    theme: Theme
    mutedVideos: boolean
    commentModalOpen: boolean
}

const initialState: InitState = {
    theme: {
        darkMode: false,
    },
    mutedVideos: false,
    commentModalOpen: false,
}

const projectReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'dark-mode':
            return {
                ...state,
                theme: {
                    darkMode: action.payload,
                },
            }

        case 'muted-video':
            return {
                ...state,
                mutedVideos: action.payload,
            }
        case 'open-comment-modal':
            return {
                ...state,
                commentModalOpen: action.payload,
            }
        default:
            return state
    }
}

export default projectReducer
