const logger = require('./utils/logger')
const usersRouter = require('./controller/users')
const express = require('express') 
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const loginRouter = require('./controller/login')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI)
.then(() => {
    logger.info('connected to MongoDB');
})
.catch(error => {
    logger.error('error connecting to MongoDb', error.message)
})

app.use(middleware.morgan(':method :url :status :response-time ms - :res[content-length] :blogs'))
//app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app