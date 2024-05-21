const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
blogsRouter.get('/', (request, response, next)=> {
    Blog.find({})
    .then(blogs => {
        response.json(blogs)
    })
    .catch(error => next(error))
}) 


blogsRouter.get('/', (request, response, next) => {
   Blog.find({})
    .then(blogs => {
        response.json(blogs)
    })
    .catch(error => next(error))
   
})

blogsRouter.get('/:id', (request, response, next)=> {
    Blog.findById(request.params.id)
    .then(blog => {
        if (blog) {
            response.json(blog)
        }
        else {
            response.status(404).end()
        }
    })

    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(savedBlogs => {
      response.status(201).json(savedBlogs)
    })
    .catch(error => next(error));
})


blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
    //204 is used for no content along with 404 so we will use for deletion
      response.status(204).end()
    })
    .catch(error => next(error))

})

module.exports = blogsRouter