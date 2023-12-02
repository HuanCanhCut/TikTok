const initState = {
    theme: {
        darkMode: false,
    },
    temporaryFollowed: [],
    temporaryUnFollowed: [],
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
        default:
            return state
    }
}

export default reducer
