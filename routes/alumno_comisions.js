//File: routes/alumno_comisions.js
module.exports = function(app) {

  var Alumno_Comision = require('../models/alumno_comision.js');

  //GET - Return all alumno_comisions in the DB
  findAllAlumno_Comisions = function(req, res) {
  	Alumno_Comision.find(function(err, alumno_comisions) {
  		if(!err) {
        console.log('GET /alumno_comisions')
  			res.send(alumno_comisions);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Alumno_Comision with specified ID
  findById = function(req, res) {
  	Alumno_Comision.findById(req.params.id, function(err, alumno_comision) {
  		if(!err) {
        console.log('GET /alumno_comision/' + req.params.id);
  			res.send(alumno_comision);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Alumno_Comision in the DB
  addAlumno_Comision = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var alumno_comision = new Alumno_Comision({
  		id_comision:    	req.body.id_comision,
		dni_alumno:			req.body.dni_alumno
		
 	});

  	alumno_comision.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(alumno_comision);
  };

  //PUT - Update a register already exists
  updateAlumno_Comision = function(req, res) {
  	Alumno_Comision.findById(req.params.id, function(err, alumno_comision) {
  		alumno_comision.id_comision			   	 = req.body.id_comision;
		alumno_comision.dni_alumno   		 = req.body.dni_alumno;
	

  		
  		alumno_comision.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(alumno_comision);
  		});
  	});
  }

  //DELETE - Delete a Alumno_Comision with specified ID
  deleteAlumno_Comision = function(req, res) {
  	Alumno_Comision.findById(req.params.id, function(err, alumno_comision) {
  		alumno_comision.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/alumno_comisions', findAllAlumno_Comisions);
  app.get('/alumno_comision/:id', findById);
  app.post('/alumno_comision', addAlumno_Comision);
  app.put('/alumno_comision/:id', updateAlumno_Comision);
  app.delete('/alumno_comision/:id', deleteAlumno_Comision);

}