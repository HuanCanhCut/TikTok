const initState = {
    theme: {
        da: false,
    },
}

function reducer(state = initState, action) {
    switch (action.type) {
        case 'dark-mode':
            return {
                ...state,
                theme: {
                    da: action.payload,
                },
            }
        default:
            return state
    }
}

export default reducer
