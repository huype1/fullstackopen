
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Give password as an arguement")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://huype1:${password}@fullstackopen.lgsoxgt.mongodb.net/phonebook?retryWrites=true&w=majority&appName=fullstackopen`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    "name" : String,
    "number" : String,
})
const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

if (process.argv === 3) {
    const person = new Person({
        "name" : process.argv[3],
        "number": process.argv[4],
    })
    
    person.save().then(result => {
        console.log(`Added ${result.name} ${result.number} to phonebook`);
        mongoose.connection.close()
    })
}
else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
