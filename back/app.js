/* import Express */
const express = require('express');

/* import Mongoose to handle data base */
const mongoose = require('mongoose');

/* Access to file system path */
//const path = require('path');

/* Create Express app */
const app = express();

/* Import routes */
const userRoutes = require('./routes/user');
//const sauceRoutes = require('./routes/posts');

/* Create express app and call dependancies */
app.use(express.json());

/* Manage CORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/* Connect to Mongoose to manage Mongo DB data base */
mongoose.connect('mongodb+srv://test:crash25@cluster0.jftm1pm.mongodb.net/?retryWrites=true&w=majority',
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
   })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* middleware for 'images' folder */
//app.use('/images', express.static(path.join(__dirname, 'images')));

/* Save routes */
app.use('/api/auth', userRoutes);
//app.use('/api/post', postRoutes);


/* Export Express app */
module.exports = app;