import { createContext, useState } from 'react'

export const updateContext = createContext()

function Wrapper({ children }) {
    const [followed, setFollowed] = useState([])
    const [unFollowed, setUnFollowed] = useState([])

    const temporaryFollow = (item) => {
        setFollowed((prev) => [...prev, item])
    }

    const temporaryUnFollow = (item) => {
        setUnFollowed((prev) => {
            if (prev !== item) {
                return [...prev, item]
            }
        })
    }

    return (
        <updateContext.Provider value={{ temporaryFollow, followed, temporaryUnFollow, unFollowed }}>
            {children}
        </updateContext.Provider>
    )
}

export default Wrapper
