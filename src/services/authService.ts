import * as request from '~/utils/httpRequest'

interface Login extends SignUp {}

interface SignUp {
    email: string
    password: string
    type?: string
}

export const signUp = async ({ email, password, type = 'email' }: SignUp) => {
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

export const login = async ({ email, password }: Login) => {
    try {
        return await request.post('auth/login', {
            email: email.toLowerCase(),
            password: password.toLowerCase(),
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout = async ({ accessToken }: { accessToken: string }) => {
    try {
        return await request.post('auth/logout', [], {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    } catch (error) {
        console.log(error)
    }
}
