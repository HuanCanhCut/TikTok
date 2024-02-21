export const sendEvent = (eventName, detail) => {
    document.dispatchEvent(new CustomEvent(eventName, { detail }))
}

export const listentEvent = (eventName, handler, context = document) => {
    context.addEventListener(eventName, handler)
    return () => context.removeEventListener(eventName, handler)
}
