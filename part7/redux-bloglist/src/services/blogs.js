import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  const sortedLikes = request.data.sort((a,b) => b.likes - a.likes)
  return sortedLikes
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject , config)
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

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment })
  return response.data
}

export default { getAll, setToken, create, update, remove, addComment }