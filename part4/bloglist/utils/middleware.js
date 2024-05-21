const morgan = require('morgan')
//dev is actually a combination of :method :url :status :response-time ms - :res[content-length] tokens
morgan.token('blogs', function(res, req) {return JSON.stringify(req.body)})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' }).end()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(404).send({ error: 'malformatted input' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(404).send({ error: error.message })
    }
    next(error)
}

module.exports = {
    morgan,
    unknownEndpoint,
    errorHandler,
}