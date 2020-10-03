//File: routes/profesores.js
module.exports = function(app) {

  var Profesor = require('../models/profesor.js');

  //GET - Return all profesores in the DB
  findAllProfesores = function(req, res) {
  	Profesor.find(function(err, profesores) {
  		if(!err) {
        console.log('GET /profesores')
  			res.send(profesores);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Profesor with specified ID
  findById = function(req, res) {
  	Profesor.findById(req.params.id, function(err, profesor) {
  		if(!err) {
        console.log('GET /profesor/' + req.params.id);
  			res.send(profesor);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Profesor in the DB
  addProfesor = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var profesor = new Profesor({
  		dni:    		req.body.dni,
		nombre: 		req.body.nombre,
		apellido:	 	req.body.apellido,  
		mail:	 		req.body.mail,
		
 	});

  	profesor.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(profesor);
  };

  //PUT - Update a register already exists
  updateProfesor = function(req, res) {
  	Profesor.findById(req.params.id, function(err, profesor) {
  		profesor.dni			 = req.body.dni;
		profesor.nombre   		 = req.body.nombre;
		profesor.apellido   = req.body.apellido;  
		profesor.mail   		 = req.body.mail;
		 

  		
  		profesor.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(profesor);
  		});
  	});
  }

  //DELETE - Delete a Profesor with specified ID
  deleteProfesor = function(req, res) {
  	Profesor.findById(req.params.id, function(err, profesor) {
  		profesor.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/profesores', findAllProfesores);
  app.get('/profesor/:id', findById);
  app.post('/profesor', addProfesor);
  app.put('/profesor/:id', updateProfesor);
  app.delete('/profesor/:id', deleteProfesor);

}