const { Schema, model } = require('mongoose') 

const User = model('User', new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Admin', 'Journalists', 'Editors '],
        default: 'Editors ',
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