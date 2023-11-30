const initState = {
    theme: {
        darkMode: false,
    },
    updateFollowList: 0,
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
        default:
            return state
    }
}

export default reducer
