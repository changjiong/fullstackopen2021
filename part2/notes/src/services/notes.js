import axios from 'axios'

const baseUrl = '/api/notes'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}
const getAll = () => {
    return axios.get(baseUrl)
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const noteService = { getAll, create, update, remove, setToken }
export default noteService
