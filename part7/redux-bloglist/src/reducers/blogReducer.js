import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlog(state, action) {
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
      return state.map(blog => (blog.id === newBlog.id ? newBlog : blog))
    },
    deleteId(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id.toString() !== id.toString())
    },
    addNewComment(state, action) {
      const { id, comment } = action.payload
      const blog = state.find(blog => blog.id.toString() === id.toString())
      if (blog) {
        blog.comments = blog.comments
          ? blog.comments.concat(comment)
          : [comment]
      }
    },
  },
})

export const { setBlog, addBlog, updateLikesBlog, deleteId, addNewComment } =
  blogSlice.actions
export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}
export const createNewBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(addBlog(newBlog))
  }
}
export const updateBlog = blogObject => {
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
export const addCommentToBlog = (blogId, comment) => {
  return async dispatch => {
    console.log('running')
    const updatedBlog = await blogService.addComment(blogId, comment)

    dispatch(addNewComment({ id: blogId, comment }))
  }
}
export default blogSlice.reducer
