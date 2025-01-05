import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { createNewBlog, updateBlog, deleteBlog } from '../reducers/blogReducer'

import { Link as RouterLink } from 'react-router-dom';
import { 
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Container,
  Divider
} from '@mui/material';

const Blogs = ({ blogFormRef, blogs }) => {
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  if (!blogs) {
    return null
  }
  const createBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createNewBlog(blogObject))
    } catch {
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          'success',
          3,
        ),
      )
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <CreateBlogForm createBlog={createBlog} />
        </Togglable>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {blogs.map(blog => (
          <Card
            key={blog.id}
            sx={{
              '&:hover': {
                boxShadow: 3,
                transition: 'box-shadow 0.3s ease-in-out',
              },
            }}>
            <CardContent>
              <Link
                component={RouterLink}
                to={`/blogs/${blog.id}`}
                sx={{
                  textDecoration: 'none',
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}>
                <Typography variant="h6">
                  {blog.title} {blog.author}
                </Typography>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  )
}
export default Blogs
