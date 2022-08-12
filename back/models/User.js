/* importatMongoose */
const mongoose = require('mongoose');

/* Import unique validator */
const uniqueValidator = require('mongoose-unique-validator');

/* Creation of data schema */
const userSchema =  mongoose.Schema({
  userName: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  admin: {type: Boolean, required: true, default: false}
});

/* Apply unique validator to schema */
userSchema.plugin(uniqueValidator);

/* Export schema as model */
module.exports = mongoose.model('User', userSchema);