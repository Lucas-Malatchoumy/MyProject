const express = require('express');
const cookieParser = require('cookie-parser');
const square = require("./lib/square")
const app     = express();
const bodyParser = require('body-parser');
const port    = 8080;
const sequelize = require('./db');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const homeRoute = require('./routes/home')

app.disable("x-powered-by")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/home', homeRoute);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.get('/square/:nb', (req, res) => {
const nb = req.params.nb
res.send(square(parseInt(nb)).toString());
});

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
