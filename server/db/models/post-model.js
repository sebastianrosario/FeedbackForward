const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userCon = require('../controllers/user-controller.js');
const UserModel = require('../models/user-model');

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
      type: String,
      required: true
    },
    tags: [String],
    comments: [
      {
        username:{
          type: String,
          required: true
        },
        content:{
          type: String
        },
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
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
  Post.pre('save', async function(next) {
    this.updatedAt = Date.now();
    next();
  });

const ff_posts = mongoose.connection.useDb("ff_posts");
module.exports = ff_posts.model('Post', Post, 'posts');

