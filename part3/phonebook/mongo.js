
const mongoose = require('mongoose')
const { Schema } = mongoose;
if (process.argv.length < 3) {
    console.log("Give password as an arguement")
    process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new Schema({
    "name" : {
        type: String,
        minLength:3, 
        required: true
    },
    "number" : {
        type: String,
        minLength: 8,
        required: true
    }
})
const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

// if (process.argv === 3) {
//     const person = new Person({
//         "name" : process.argv[3],
//         "number": process.argv[4],
//     })
    
//     person.save().then(result => {
//         console.log(`Added ${result.name} ${result.number} to phonebook`);
//         mongoose.connection.close()
//     })
// }
// else {
//     Person.find({}).then(result => {
//         result.forEach(person => {
//             console.log(`${person.name} ${person.number}`)
//         })
//         mongoose.connection.close()
//     })
// }
