export const themeSelector = (state) => {
    return state.theme.darkMode
}

export const temporaryFollower = (state) => {
    return state.follow.followList
}

export const temporaryUnFollower = (state) => {
    return state.unFollow.unFollowList
}
