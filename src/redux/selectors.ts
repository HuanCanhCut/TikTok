export const themeSelector = (state: any) => {
    return state.project.theme.darkMode
}

export const temporaryFollowed = (state: any) => {
    return state.temp.temporaryFollowed
}

export const temporaryUnFollowed = (state: any) => {
    return state.temp.temporaryUnFollowed
}

export const temporaryLiked = (state: any) => {
    return state.temp.temporaryLiked
}

export const temporaryUnLiked = (state: any) => {
    return state.temp.temporaryUnLiked
}

export const mutedVideo = (state: any) => {
    return state.project.mutedVideos
}

export const authCurrentUser = (state: any) => {
    return state.auth.currentUser
}

export const commentModalOpen = (state: any) => {
    return state.project.commentModalOpen
}
