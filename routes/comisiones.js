//File: routes/comisions.js
module.exports = function(app) {

  var Comision = require('../models/comision.js');

  //GET - Return all comisions in the DB
  findAllComisions = function(req, res) {
  	Comision.find(function(err, comisions) {
  		if(!err) {
        console.log('GET /comisions')
  			res.send(comisions);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Comision with specified ID
  findById = function(req, res) {
  	Comision.findById(req.params.id, function(err, comision) {
  		if(!err) {
        console.log('GET /comision/' + req.params.id);
  			res.send(comision);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Comision in the DB
  addComision = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var comision = new Comision({
  		id:    			req.body.dni,
		nombre: 		req.body.nombre,
		clasesTotales: 	req.body.nombre  
 	});

  	comision.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(comision);
  };

  //PUT - Update a register already exists
  updateComision = function(req, res) {
  	Comision.findById(req.params.id, function(err, comision) {
  		comision.id			   	 = req.body.petId;
		comision.nombre   		 = req.body.nombre;
		comision.clasesTotales   = req.body.clasesTotales;  

  		
  		comision.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(comision);
  		});
  	});
  }

  //DELETE - Delete a Comision with specified ID
  deleteComision = function(req, res) {
  	Comision.findById(req.params.id, function(err, comision) {
  		comision.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/comisions', findAllComisions);
  app.get('/comision/:id', findById);
  app.post('/comision', addComision);
  app.put('/comision/:id', updateComision);
  app.delete('/comision/:id', deleteComision);

}