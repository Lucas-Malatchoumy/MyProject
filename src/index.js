const express = require('express');
const square = require("./lib/square")
const app     = express();
const bodyParser = require('body-parser');
const port    = 8080;
const sequelize = require('./db');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

app.disable("x-powered-by")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use(express.static('public'));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Models synchronized');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

let server;

server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = {
    app,
    closeServer: () => {
        server.close();
    }
};
