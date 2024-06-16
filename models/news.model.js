const { Schema, model } = require('mongoose');

const News = model('News',new Schema({
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
      categoryId: {
        type: Schema.Types.ObjectId,
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

module.exports = News;
