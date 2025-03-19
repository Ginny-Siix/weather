const mongoose = require('mongoose');

const connectionString = process.env.Mango_URI;

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connectée bravo !'))
  .catch(error => console.error(error));
