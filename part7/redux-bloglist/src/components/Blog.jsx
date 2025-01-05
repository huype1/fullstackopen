import { useState } from 'react'
import propTypes from 'prop-types'
import {
  updateBlog,
  deleteBlog,
  addCommentToBlog,
} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  Link,
  Box,
  Divider,
} from '@mui/material'

const Blog = ({ blogs, currUser }) => {
  const blogMatch = useMatch('/blogs/:id')
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null
  let showDeletion = { display: 'none' }
  const navigate = useNavigate()
  if (!blog) {
    return null
  }
  // if (!blog) {
  //   return <p>Blog not found</p>
  // }
  // let buttonLabel = viewing ? 'hide' : 'view'

  // const showWhenView = { display: viewing ? '' : 'none' }
  if (blog.user) {
    showDeletion = {
      display: currUser.username === blog.user.username ? '' : 'none',
    }
  }
  // const toggleViewing = () => setViewing(!viewing)

  const likeBlog = async event => {
    event.preventDefault()
    try {
      const tempBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        userId: blog.user.id,
        id: blog.id,
      }
      dispatch(updateBlog(tempBlog))
    } catch (error) {
      console.log(error)
      dispatch(setNotification('Unable to like this blog', 'error', 3))
    }
  }

  const removeBlog = async event => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog.id))
        navigate(-1)
      } catch (error) {
        dispatch(setNotification('Cannot delete blog', 'error', 3))
      }
    }
  }

  const handleAddComment = event => {
    event.preventDefault()
    if (comment.trim()) {
      dispatch(addCommentToBlog(blog.id, comment))
      setComment('')
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4">
      <CardContent className="space-y-4">
        {/* Title and Author */}
        <Typography className="text-2xl font-bold">
          {blog.title} {blog.author}
        </Typography>

        {/* URL */}
        <Link href={blog.url} className="text-blue-500 hover:text-blue-700">
          {blog.url}
        </Link>

        {/* Likes section */}
        <Box className="flex items-center gap-2">
          <Typography>likes {blog.likes}</Typography>
          <Button
            onClick={likeBlog}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
            like
          </Button>
        </Box>

        {/* User info */}
        {blog.user && (
          <Typography className="text-gray-600">
            added by {blog.user.name}
          </Typography>
        )}

        {/* Remove button */}
        {showDeletion.display !== 'none' && (
          <Button
            onClick={removeBlog}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">
            remove
          </Button>
        )}

        <Divider className="my-4" />

        {/* Comments section */}
        <Typography className="text-xl font-semibold">Comments</Typography>

        <form onSubmit={handleAddComment} className="flex gap-2">
          <TextField
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment"
            className="flex-grow"
          />
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
            add comment
          </Button>
        </form>

        <List className="list-disc pl-6">
          {blog.comments?.map((c, index) => (
            <ListItem key={index} className="text-gray-800">
              {c}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default Blog

// Blog.propTypes = {
//   blogs: propTypes.object.isRequired,
//   currUser: propTypes.object.isRequired,
// }
