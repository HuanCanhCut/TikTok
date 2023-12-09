const initState = {
    theme: {
        darkMode: false,
    },
    temporaryFollowed: [],
    temporaryUnFollowed: [],

    temporaryLiked: [],
    temporaryUnLiked: [],

    mutedVideos: false,
    openAuth: false,
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
        case 'temporary-liked':
            return {
                ...state,
                temporaryLiked: [...state.temporaryLiked, action.payload],
            }
        case 'temporary-unLiked':
            return {
                ...state,
                temporaryUnLiked: [...state.temporaryUnLiked, action.payload],
            }
        case 'muted-video':
            return {
                ...state,
                mutedVideos: action.payload,
            }
        case 'open-auth':
            return {
                ...state,
                openAuth: action.payload,
            }

        default:
            return state
    }
}

export default reducer
