/* import dotenv */
const dotenv = require('dotenv');
dotenv.config();

/* import Express */
const express = require('express');

/* import Mongoose to handle data base */
const mongoose = require('mongoose');

/* import Helmet to secure http headers */
const helmet = require('helmet');

/* import mong sanitize to avoid sql injections */
const mongoSanitize = require('express-mongo-sanitize');

/* Access to file system path */
const path = require('path');

/* Create Express app */
const app = express();

/* Import routes */
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

/* Create express app and call dependancies */
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(mongoSanitize()); 

/* Manage CORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Bondary');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/* Connect to Mongoose to manage Mongo DB data base */
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jftm1pm.mongodb.net/?retryWrites=true&w=majority`,
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
   })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* middleware for 'images' folder */
app.use('/images', express.static(path.join(__dirname, 'images')));

/* Save routes */
app.use('/groupomania/auth', userRoutes);
app.use('/groupomania/post', postRoutes);

/* Export Express app */
module.exports = app;