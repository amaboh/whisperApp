const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    googleId:{
        type: 'string',
        required: true
    },
    displayName:{
        type: 'string',
        required: true 
    },
    firstName:{
        type: 'string',
        required: true
    },
    lastName:{
        type: 'string',
        required: true
    },
    image:{
        type: 'string',
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', UserSchema)