interface AllowUser {
    title: string
    type: string
    isChecked: boolean
}

export const allowAction = (payload: AllowUser) => {
    return {
        type: 'allowSelect',
        payload,
    }
}
