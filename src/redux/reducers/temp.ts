export interface InitState {
    temporaryFollowed: number[]
    temporaryUnFollowed: number[]
    temporaryLiked: number[]
    temporaryUnLiked: number[]
    mutedVideos: boolean
}

const initState: InitState = {
    temporaryFollowed: [],
    temporaryUnFollowed: [],

    temporaryLiked: [],
    temporaryUnLiked: [],

    mutedVideos: false,
}

const tempReducer = (state = initState, action: any) => {
    switch (action.type) {
        case 'temporary-followed':
            return {
                ...state,
                temporaryFollowed: [...state.temporaryFollowed, action.payload],
            }
        case 'temporary-unFollowed':
            return {
                ...state,
                temporaryUnFollowed: [...state.temporaryUnFollowed, action.payload],
            }
        case 'temporary-liked':
            return {
                ...state,
                temporaryLiked: [...state.temporaryLiked, action.payload],
            }
        case 'temporary-unLiked':
            return {
                ...state,
                temporaryUnLiked: [...state.temporaryUnLiked, action.payload],
            }
        default:
            return state
    }
}

export default tempReducer
