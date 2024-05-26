const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
blogsRouter.get('/', async (request, response, next)=> {
   const blogs = await Blog.find({})
   response.json(blogs) 
}) 


blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs) 
   
})

blogsRouter.get('/:id', async (request, response, next)=> {
    const blog = await Blog.findById(request.params.id)
    
    if (blog) {response.json(blog)}
    else {response.status(404).end()}
})

blogsRouter.post('/', (request, response, next) => {
  
})
// blogsRouter.put('/:id', (request, response, next) => {
//     const blog = new Blog(request.body)
//     Blog.findByIdAndUpdate(request.params.id, blog,  { new: true, runValidators: true, context: 'query' })
//     .then(updatedBlog => {
//       response.json(updatedBlog)
//     })
//     .catch(error => next(error))
// })


blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
    //204 is used for no content along with 404 so we will use for deletion
      response.status(204).end()
    })
    .catch(error => next(error))

})

module.exports = blogsRouter