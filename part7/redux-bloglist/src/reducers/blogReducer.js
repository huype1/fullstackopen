import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      console.log(action.payload)
      return action.payload
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    updateLikesBlog(state, action) {
      const id = action.payload.id
      const blogLiked = state.find(blog => blog.id.toString() === id.toString())
      const newBlog = {
        ...blogLiked,
        likes: blogLiked.likes + 1,
      }
      return state
        .map(blog => (blog.id === newBlog.id ? newBlog : blog))
    },
    deleteId(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id.toString() === id.toString)
    }
  },
})

export const { setBlog, addBlog, updateLikesBlog, deleteId } = blogSlice.actions
export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll().sort((a, b) => a.likes - b.likes)
    dispatch(setBlog(blogs))
  }
}
export const createNewBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(addBlog(newBlog))
  }
}
export const likeBlog = blogObject => {
  return async dispatch => {
    const blog = await blogService.update({
      ...blogObject,
      likes: blogObject.likes + 1,
    })
    dispatch(updateLikesBlog(blog))
  }
}
export const deleteBlog = blogid => {
  return async dispatch => {
    await blogService.remove(blogid)
    dispatch(deleteId(blogid))
  }
}
export default blogSlice.reducer
