const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tags: [String],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    published: {
      type: Boolean,
      default: false
    }
  });
  
  // Add a pre-save hook to update the updatedAt field
  postSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });


module.exports = mongoose.model('Post', Post, 'posts');

