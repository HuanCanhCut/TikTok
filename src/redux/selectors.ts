import { InitState } from './reducer'

export const themeSelector = (state: InitState) => {
    return state.theme.darkMode
}

export const temporaryFollowed = (state: InitState) => {
    return state.temporaryFollowed
}

export const temporaryUnFollowed = (state: InitState) => {
    return state.temporaryUnFollowed
}

export const temporaryLiked = (state: InitState) => {
    return state.temporaryLiked
}

export const temporaryUnLiked = (state: InitState) => {
    return state.temporaryUnLiked
}

export const mutedVideo = (state: InitState) => {
    return state.mutedVideos
}
