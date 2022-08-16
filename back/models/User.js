/* importatMongoose */
const mongoose = require('mongoose');

/* Import unique validator */
const uniqueValidator = require('mongoose-unique-validator');

/* Creation of data schema */
const userSchema =  mongoose.Schema({
  firstName: {type: String, required: true, unique: true},
  lastName: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  admin: {type: Boolean, default: false}
});

/* Apply unique validator to schema */
userSchema.plugin(uniqueValidator);

/* Export schema as model */
module.exports = mongoose.model('User', userSchema);