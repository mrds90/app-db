//File: routes/profesor_comisions.js
module.exports = function(app) {

  var Profesor_Comision = require('../models/profesor_comision.js');

  //GET - Return all profesor_comisions in the DB
  findAllProfesor_Comisions = function(req, res) {
  	Profesor_Comision.find(function(err, profesor_comisions) {
  		if(!err) {
        console.log('GET /profesor_comisions')
  			res.send(profesor_comisions);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Profesor_Comision with specified ID
  findById = function(req, res) {
  	Profesor_Comision.findById(req.params.id, function(err, profesor_comision) {
  		if(!err) {
        console.log('GET /profesor_comision/' + req.params.id);
  			res.send(profesor_comision);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Profesor_Comision in the DB
  addProfesor_Comision = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var profesor_comision = new Profesor_Comision({
  		id_comision:    	req.body.id_comision,
		dni_profesor:		req.body.dni_profesor
		
 	});

  	profesor_comision.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(profesor_comision);
  };

  //PUT - Update a register already exists
  updateProfesor_Comision = function(req, res) {
  	Profesor_Comision.findById(req.params.id, function(err, profesor_comision) {
  		profesor_comision.id_comision		= req.body.id_comision;
		profesor_comision.dni_profesor  	= req.body.dni_profesor;
	

  		
  		profesor_comision.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(profesor_comision);
  		});
  	});
  }

  //DELETE - Delete a Profesor_Comision with specified ID
  deleteProfesor_Comision = function(req, res) {
  	Profesor_Comision.findById(req.params.id, function(err, profesor_comision) {
  		profesor_comision.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/profesor_comisions', findAllProfesor_Comisions);
  app.get('/profesor_comision/:id', findById);
  app.post('/profesor_comision', addProfesor_Comision);
  app.put('/profesor_comision/:id', updateProfesor_Comision);
  app.delete('/profesor_comision/:id', deleteProfesor_Comision);

}