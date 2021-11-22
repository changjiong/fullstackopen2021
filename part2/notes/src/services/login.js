import axios from 'axios'
const baseUrl = '/api/login'
const signUrl = '/api/users'

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const signup = async (username, password) => {
    const response = await axios.post(signUrl, { username, password })
    return response.data
}
const loginService = { login, signup }
export default loginService
