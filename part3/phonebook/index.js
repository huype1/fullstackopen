const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
const cors = require('cors')
app.use(cors())


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1 style="text-align: center">This is the home page of the website</h1>')
})

app.get('/api/persons', (request, response) => {
  
  response.json(persons)
  
})

app.get('/api/info', (request, response) => {
  const time = new Date()
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${time}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const name = persons.find(name => name.id === id)
  
  if (name) {
    response.json(name)
  }
  else {
    response.statusMessage = `Cannot find id: ${id} in the phonebook`
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  //204 is used for no content along with 404 so we will use for deletion
  response.status(204).end()
})


const createId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 1
  return maxId + 1;
}

app.post('/api/persons', (request, response) => {
  
  const person = request.body
  person.id = createId()

  morgan.token('person',  function (req, res) {
      return JSON.stringify(req.body);
  })

  if (!person.number) {
    return response.status(400).json({ error : `Phone number is missing` })
  }
  if (persons.find(used => used.name == person.name)) {
    return response.status(400).json({ error : `Name must be unique` })
  }
  
    
  
  persons = persons.concat(person)
  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log("The server running on " + PORT)
})
