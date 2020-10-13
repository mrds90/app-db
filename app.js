var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    // io = require("socket.io").listen(server),
    // npid = require("npid"),
    // uuid = require('node-uuid'),
    // _ = require('underscore')._,
    bodyParser  = require('body-parser');

    mongoose = require('mongoose');
    var cors = require('cors');
    var corsOptions = {origin:"*",optionSucessStatus:200};
    
    app.set('port', process.env.PORT || 3000)
    app.use(cors(corsOptions));

    var env = process.env.NODE_ENV || 'development';

     var bodyParser = require('body-parser'); 
     app.use(bodyParser.urlencoded({
         extended: true
     }));
     app.use(bodyParser.json());
  // app.use(express.methodOverride());
  // app.use(app.mountpath);
    
   


  app.get('/', function(req, res) {
  res.send("Hello world!");
});


routes = require('./routes/alumnos')(app);

mongoose.connect('mongodb+srv://myt:mata@cluster0.5dbpm.gcp.mongodb.net/aplicacion?retryWrites=true&w=majority', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

server.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

