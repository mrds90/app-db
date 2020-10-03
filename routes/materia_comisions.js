//File: routes/materia_comisions.js
module.exports = function(app) {

  var Materia_Comision = require('../models/materia_comision.js');

  //GET - Return all materia_comisions in the DB
  findAllMateria_Comisions = function(req, res) {
  	Materia_Comision.find(function(err, materia_comisions) {
  		if(!err) {
        console.log('GET /materia_comisions')
  			res.send(materia_comisions);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Materia_Comision with specified ID
  findById = function(req, res) {
  	Materia_Comision.findById(req.params.id, function(err, materia_comision) {
  		if(!err) {
        console.log('GET /materia_comision/' + req.params.id);
  			res.send(materia_comision);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Materia_Comision in the DB
  addMateria_Comision = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var materia_comision = new Materia_Comision({
  		id_comision:    	req.body.id_comision,
		id_materia:			req.body.id_materia
		
 	});

  	materia_comision.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(materia_comision);
  };

  //PUT - Update a register already exists
  updateMateria_Comision = function(req, res) {
  	Materia_Comision.findById(req.params.id, function(err, materia_comision) {
  		materia_comision.id_comision		 = req.body.id_comision;
		materia_comision.id_materia  		 = req.body.id_materia;
	

  		
  		materia_comision.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(materia_comision);
  		});
  	});
  }

  //DELETE - Delete a Materia_Comision with specified ID
  deleteMateria_Comision = function(req, res) {
  	Materia_Comision.findById(req.params.id, function(err, materia_comision) {
  		materia_comision.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/materia_comisions', findAllMateria_Comisions);
  app.get('/materia_comision/:id', findById);
  app.post('/materia_comision', addMateria_Comision);
  app.put('/materia_comision/:id', updateMateria_Comision);
  app.delete('/materia_comision/:id', deleteMateria_Comision);

}