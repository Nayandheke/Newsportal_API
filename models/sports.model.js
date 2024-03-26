const { Schema, model } = require('mongoose');

const Sports = model('Sports',new Schema({
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

module.exports = Sports;
