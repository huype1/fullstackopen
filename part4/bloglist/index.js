require('dotenv').config({path: '.env'})
const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')


//dev is actually a combination of :method :url :status :response-time ms - :res[content-length] tokens
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :blogs'))
morgan.token('blogs', function(res, req) {return JSON.stringify(req.body)})

const mongoose = require('mongoose')
const {Schema} = mongoose
mongoose.set('strictQuery', false)
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
.then(() => {
    console.log('connected to MongoDB');
})
.catch(error => {
    console.log('error connecting to MongoDb', error.message)
})
const blogSchema = new Schema({
    'title': String,
    'author': String,
    'url': String,
    'likes': Number
})

const Blog = mongoose.model("Blog", blogSchema)



blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
        delete returnedObject._v
    }
})

const cors = require('cors')
app.use(cors())

app.get('/api/blogs', (request, response, next) => {
   Blog.find({})
    .then(blogs => {
        response.json(blogs)
    })

    .catch(error => next(error))
   
})

app.get('/api/blogs/:id', (request, response, next)=> {
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
app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)
    console.log(request.body)
  blog
    .save()
    .then(savedBlogs => {
      response.status(201).json(savedBlogs)
    })
    .catch(error => next(error));
})


app.get('/api/blogs', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })

    .catch(error => next(error))
})

app.delete('/api/blogs/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
    //204 is used for no content along with 404 so we will use for deletion
      response.status(204).end()
    })
    .catch(error => next(error))

})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' }).end()
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(404).send({ error: 'malformatted input' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(404).send({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`) 
})