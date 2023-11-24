export const darkMode = (payload) => {
    localStorage.setItem('darkMode', JSON.stringify(payload))
    return {
        type: 'dark-mode',
        payload,
    }
}
