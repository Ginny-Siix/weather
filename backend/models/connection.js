const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://ginnysiix45:L5Kda1pYSscyd3qb@fullstack-main.5wib6.mongodb.net/weather';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connectée bravo !'))
  .catch(error => console.error(error));
