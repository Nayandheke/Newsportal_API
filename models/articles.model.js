const { Schema, model } = require('mongoose');

const Articles = model('Articles',new Schema({
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
        type: Boolean,
        default: true,
    },
      latest: {
        type: Boolean,
        default: true,
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

module.exports = Articles;
