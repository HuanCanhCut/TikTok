import * as request from '~/utils/httpRequest'

export const login = async (email, password) => {
    try {
        return await request.post('auth/login', {
            email: email.toLowerCase(),
            password: password.toLowerCase(),
        })
    } catch (error) {
        console.log(error)
    }
}

export const signUp = async (email, password, type = 'email') => {
    try {
        return await request.post('auth/register', {
            type,
            email,
            password,
        })
    } catch (error) {
        console.log(error)
    }
}
