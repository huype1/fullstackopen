const mongoose = require('mongoose')
const {Schema} = mongoose


const blogSchema = new Schema({
    'title': String,
    'author': String,
    'url': String,
    'likes': Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
        delete returnedObject._v
    }
})
module.exports = mongoose.model("Blog", blogSchema)

