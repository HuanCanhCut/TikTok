export const darkMode = (payload) => {
    localStorage.setItem('darkMode', JSON.stringify(payload))
    return {
        type: 'dark-mode',
        payload,
    }
}

export const temporaryFollowed = (payload) => {
    return {
        type: 'temporary-followed',
        payload,
    }
}

export const temporaryUnFollowed = (payload) => {
    return {
        type: 'temporary-unFollowed',
        payload,
    }
}

export const mutedVideo = (payload) => {
    return {
        type: 'muted-video',
        payload,
    }
}

export const temporaryLiked = (payload) => {
    return {
        type: 'temporary-liked',
        payload,
    }
}

export const temporaryUnLiked = (payload) => {
    return {
        type: 'temporary-unLiked',
        payload,
    }
}

export const openAuth = (payload) => {
    return {
        type: 'open-auth',
        payload,
    }
}
