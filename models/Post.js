const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Title
// Body
// Likes
// Comments,
// Date
const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  author: {
    type: String
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    },
  ],
  comments: [
    {
      text: {
        type: String,
        required: true
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      username: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
