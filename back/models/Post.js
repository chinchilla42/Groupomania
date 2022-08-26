/* importatMongoose */
const mongoose = require('mongoose');

/* Creation of data schema */
const userSchema =  mongoose.Schema({
  userId: { type: String, required: true },
  author: { type: String, required: true},
  date: {type: String, required: true},
  content: {type: String, required: true},
  image: { type: String},
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
});

/* Export schema as model */
module.exports = mongoose.model('Post', userSchema);