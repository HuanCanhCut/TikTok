const initState = {
    theme: {
        darkMode: false,
    },
}

function reducer(state = initState, action) {
    switch (action.type) {
        case 'dark-mode':
            return {
                ...state,
                theme: {
                    darkMode: true,
                },
            }
        default:
            return state
    }
}

export default reducer
