//File: routes/alumno_clases.js
module.exports = function(app) {

  var Alumno_Clase = require('../models/alumno_clase.js');

  //GET - Return all alumno_clases in the DB
  findAllAlumno_Clases = function(req, res) {
  	Alumno_Clase.find(function(err, alumno_clases) {
  		if(!err) {
        console.log('GET /alumno_clases')
  			res.send(alumno_clases);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Alumno_Clase with specified ID
  findById = function(req, res) {
  	Alumno_Clase.findById(req.params.id, function(err, alumno_clase) {
  		if(!err) {
        console.log('GET /alumno_clase/' + req.params.id);
  			res.send(alumno_clase);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Alumno_Clase in the DB
  addAlumno_Clase = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var alumno_clase = new Alumno_Clase({
  		id_clase:    	req.body.id_clase,
		dni_alumno:			req.body.dni_alumno
		
 	});

  	alumno_clase.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(alumno_clase);
  };

  //PUT - Update a register already exists
  updateAlumno_Clase = function(req, res) {
  	Alumno_Clase.findById(req.params.id, function(err, alumno_clase) {
  		alumno_clase.id_clase			   	 = req.body.id_clase;
		alumno_clase.dni_alumno   		 = req.body.dni_alumno;
	

  		
  		alumno_clase.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(alumno_clase);
  		});
  	});
  }

  //DELETE - Delete a Alumno_Clase with specified ID
  deleteAlumno_Clase = function(req, res) {
  	Alumno_Clase.findById(req.params.id, function(err, alumno_clase) {
  		alumno_clase.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/alumno_clases', findAllAlumno_Clases);
  app.get('/alumno_clase/:id', findById);
  app.post('/alumno_clase', addAlumno_Clase);
  app.put('/alumno_clase/:id', updateAlumno_Clase);
  app.delete('/alumno_clase/:id', deleteAlumno_Clase);

}