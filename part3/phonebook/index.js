require('dotenv').config({ path: 'local.env' })
const express = require('express')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())

const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] :response-time ms :person'))
morgan.token('person',  function (req ) {
  return JSON.stringify(req.body)
})
const cors = require('cors')
app.use(cors())
// let persons = [
//     {
//       "id": 1,
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]



//get all the data from phonebook pulling straight from mongodb
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => next(error))
})

//get information about the number of people and current time
app.get('/api/info', (request, response, next) => {
  const time = new Date()
  Person.countDocuments({})
    .then(count => {
      response.send(`
  <p>Phonebook has info ${count} for people</p>
  <p>${time}</p>`)
    })
    .catch(error => next(error))

})

//search by people id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  })

    .catch(error => next(error))

})

//delete a person from the phonebook
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
    //204 is used for no content along with 404 so we will use for deletion
      response.status(204).end()
    })
    .catch(error => next(error))

})


// const createId = () => {
//   const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 1
//   return maxId + 1;
// }

//create a new person

app.post('/api/persons/', (request, response, next) => {

  const data = request.body
  // if (body.content === undefined) {
  //   return response.status(400).json({ error : `Name is missing` })
  // }
  const person = new Person({
    name: data.name,
    number: data.number,
  })


  person.save()
    .then(savedPerson =>  response.json(savedPerson))
    .catch(error => next(error))


})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  // if (isNaN(body.number)) {
  //   return response.status(400).json({error: 'No phone number to change'})
  // }
  Person.findByIdAndUpdate(request.params.id, person,  { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})



//midddleware for error handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)



const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(404).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('The server running on ' + PORT)
})
