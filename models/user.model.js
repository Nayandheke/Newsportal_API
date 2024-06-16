const { Schema, model } = require('mongoose') 

const User = model('User', new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Admin', 'User', 'Editor'],
        default: 'User', 
    },
    status: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})
)

module.exports = User