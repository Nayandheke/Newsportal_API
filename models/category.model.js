const {Schema, model} = require('mongoose')

const Category = model('Category', new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Draft', 'Published'],
        default: 'Draft', 
    }
},{
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})
)

module.exports = Category