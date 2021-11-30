import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then((response) => response.data)
}

const blogService = {
    getAll,
    create,
    setToken,
}

export default blogService
