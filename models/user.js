const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    googleId: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: true
    },

    accessToken: {
        type: String,
        required: true
    }
})

userSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', userSchema)