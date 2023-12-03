const initState = {
    theme: {
        darkMode: false,
    },
    temporaryFollowed: [],
    temporaryUnFollowed: [],
    mutedVideos: false,
}

function reducer(state = initState, action) {
    switch (action.type) {
        case 'dark-mode':
            return {
                ...state,
                theme: {
                    darkMode: action.payload,
                },
            }
        case 'temporary-followed':
            return {
                ...state,
                temporaryFollowed: [...state.temporaryFollowed, action.payload],
            }
        case 'temporary-unFollowed':
            return {
                ...state,
                temporaryUnFollowed: [...state.temporaryUnFollowed, action.payload],
            }
        case 'muted-video':
            return {
                ...state,
                mutedVideos: action.payload,
            }
        default:
            return state
    }
}

export default reducer
