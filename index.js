var express = require('express');
// var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

// set port & assign var to express function
var port = process.env.PORT || 8080;


var app = express();

// Process max listeners and over run serve from unhandled rejection or uncaught Exception error
process.setMaxListeners(0);
process.on('unhandledRejection', function(reason, promise) {
    console.log(reason);
    console.error("'Un Handled Rejection' Error Log File - " + new Date().toLocaleDateString());
});
process.on('uncaughtException', function(err) {
    console.log(err);
    console.error(" 'Un Caught Exception' Error Log File - " + new Date().toLocaleDateString());
});

app.use(cors());

app.use(express.static(__dirname + '/dist/my-app-task/'));

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/my-app-task', 'index.html'));
});



// app.use(express.static(__dirname + '/'));

// app.use(function (req, res) {
//     res.sendFile(path.join(__dirname, '', 'index.html'));
// });


app.get('*', function(req, res) {
    res.send('This is Server Side Page');
});


app.listen(port, function() {
    console.log('Listening on port ' + port);
});
