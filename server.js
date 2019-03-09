require('rootpath')();
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const errorHandler = require('_helpers/error-handler');
const jwt = require('_helpers/jwt');
//===node server
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.use(jwt());
app.use('/api/users/', require('./users/users.controller'));
app.use('/api/feedback/', require('./feedback/feedback.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
