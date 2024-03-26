const { Schema, model } = require('mongoose');

const Politics = model('Politics',new Schema({
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      images:{
        type: [String],
        required: true,
    },
      status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
      },
      featured: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      autoIndex: true,
      autoCreate: true,
    }
  )
);

module.exports = Politics;
