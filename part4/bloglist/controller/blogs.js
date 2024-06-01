const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs) 
   
})

blogsRouter.get('/:id', async (request, response)=> {
    const blog = await Blog.findById(request.params.id)
    if (blog) {response.json(blog)}
    else {response.status(404).end()}

})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  console.log(blog)
  if (isNaN(blog.likes)) {
    blog.likes = 0;
  }
  const savedBlogs = await blog.save()
  response.status(201).json(savedBlogs)
})
// blogsRouter.put('/:id', (request, response, next) => {
//     const blog = new Blog(request.body)
//     Blog.findByIdAndUpdate(request.params.id, blog,  { new: true, runValidators: true, context: 'query' })
//     .then(updatedBlog => {
//       response.json(updatedBlog)
//     })
//     .catch(error => next(error))
// })


blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    //204 is used for no content along with 404 so we will use for deletion
      response.status(204).end()
})

module.exports = blogsRouter