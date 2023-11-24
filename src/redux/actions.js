export const darkMode = (payload) => {
    localStorage.setItem('darkMode', JSON.stringify(payload))
    return {
        type: 'dark-mode',
        payload,
    }
}

export const followList = (payload) => {
    return {
        type: 'follow-list',
        payload,
    }
}

export const unFollowList = (payload) => {
    return {
        type: 'unfollow-list',
        payload,
    }
}
