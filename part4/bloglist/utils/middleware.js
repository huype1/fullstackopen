const morgan = require('morgan')
//dev is actually a combination of :method :url :status :response-time ms - :res[content-length] tokens
morgan.token('blogs', function(res, req) {return JSON.stringify(req.body)})

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
    request.token =  authorization.replace('Bearer ', '')
  }
  next()
}

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const userExtractor = async (request, response, next) => {
 try {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.replace('Bearer ', '');
      const decodedToken = jwt.verify(token, process.env.SECRET);

      if (!decodedToken.id) {
        return response.status(401).json({ error: 'Invalid token' });
      }

      request.user = await User.findById(decodedToken.id);
    }

    next();
  } catch (error) {
    next(error);
  }
}; 

const unknownEndpoint = (request, response) => {
    console.log(response)
    response.status(404).send({ error: 'unknown endpoint' }).end()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted input' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expect `username` to be unique' })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' })
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    }
    
    next(error)
}

module.exports = {
    morgan,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler,
}