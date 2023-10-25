export const da = (payload) => {
    localStorage.setItem('da  ', JSON.stringify(payload))
    return {
        type: 'dark-mode',
        payload,
    }
}
