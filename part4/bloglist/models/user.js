const mongooose = require('mongoose')

const userSchema = new mongooose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
    name: String,
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    },
})

module.exports = mongooose.model('User', userSchema)
