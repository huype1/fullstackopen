const mongoose = require('mongoose')
const {Schema} = mongoose


const blogSchema = new Schema({
    'title': {
        type: String,
        required: true,
    },
    'author': String,
    'url': {
        type: String,
        required: true,
    },
    'likes': {
        type: Number,
        required: true,
    },
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
        delete returnedObject._v
    }
})
module.exports = mongoose.model("Blog", blogSchema)


