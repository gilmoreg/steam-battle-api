const express = require('express');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');

const { router } = require('./routes/');
const { logger } = require('./logger');

require('dotenv').config();

const app = express();
let server;

app.use(cors());
app.use(router);
app.use(morgan('common', { stream: logger.stream }));

function runServer(port = process.env.PORT) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve();
    })
    .on('error', (err) => {
      reject(err);
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       logger.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
