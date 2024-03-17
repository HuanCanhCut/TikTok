export const darkMode = (payload: boolean) => {
    localStorage.setItem('darkMode', JSON.stringify(payload))
    return {
        type: 'dark-mode',
        payload,
    }
}

export const temporaryFollowed = (payload: number) => {
    return {
        type: 'temporary-followed',
        payload,
    }
}

export const temporaryUnFollowed = (payload: number) => {
    return {
        type: 'temporary-unFollowed',
        payload,
    }
}

export const mutedVideo = (payload: boolean) => {
    return {
        type: 'muted-video',
        payload,
    }
}

export const temporaryLiked = (payload: number) => {
    return {
        type: 'temporary-liked',
        payload,
    }
}

export const temporaryUnLiked = (payload: number) => {
    return {
        type: 'temporary-unLiked',
        payload,
    }
}

export const currentUser = (payload: any) => {
    return {
        type: 'auth',
        payload,
    }
}

export const logOut = (payload: any) => {
    return {
        type: 'log-out',
        payload,
    }
}
