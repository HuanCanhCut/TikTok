const initState = {
    theme: {
        darkMode: false,
    },

    // List followed and unFollowed temporarily
    follow: {
        followList: [],
    },
    unFollow: {
        unFollowList: [],
    },
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
        case 'follow-list':
            return {
                ...state,
                follow: {
                    followList: action.payload,
                },
            }
        case 'unfollow-list':
            return {
                ...state,
                unFollowList: action.payload,
            }
        default:
            return state
    }
}

export default reducer
