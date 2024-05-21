const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI


mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')

  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new Schema({
  'name' : {
    type: String,
    minLength:3,
    required: true
  },
  'number' : {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{3}-|d{2}-\d{2, }/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



module.exports = mongoose.model('Person', personSchema)

