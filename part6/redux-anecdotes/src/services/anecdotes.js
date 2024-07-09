import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    const object = {
        content,
        votes: 0,
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async object => {
    try {
      const response = await axios.put(`${baseUrl}/${object.id}`, object)
      return response.data
    }
    catch(error) {
      console.log(error.message)
    }
  }

export default {getAll, create, update}