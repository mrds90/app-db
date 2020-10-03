//File: routes/clase_comisions.js
module.exports = function(app) {

  var Clase_Comision = require('../models/clase_comision.js');

  //GET - Return all clase_comisions in the DB
  findAllClase_Comisions = function(req, res) {
  	Clase_Comision.find(function(err, clase_comisions) {
  		if(!err) {
        console.log('GET /clase_comisions')
  			res.send(clase_comisions);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Clase_Comision with specified ID
  findById = function(req, res) {
  	Clase_Comision.findById(req.params.id, function(err, clase_comision) {
  		if(!err) {
        console.log('GET /clase_comision/' + req.params.id);
  			res.send(clase_comision);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Clase_Comision in the DB
  addClase_Comision = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var clase_comision = new Clase_Comision({
  		id_comision:    	req.body.id_comision,
		id_clase:			req.body.id_clase
		
 	});

  	clase_comision.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(clase_comision);
  };

  //PUT - Update a register already exists
  updateClase_Comision = function(req, res) {
  	Clase_Comision.findById(req.params.id, function(err, clase_comision) {
  		clase_comision.id_comision		 = req.body.id_comision;
		clase_comision.id_clase  		 = req.body.id_clase;
	

  		
  		clase_comision.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(clase_comision);
  		});
  	});
  }

  //DELETE - Delete a Clase_Comision with specified ID
  deleteClase_Comision = function(req, res) {
  	Clase_Comision.findById(req.params.id, function(err, clase_comision) {
  		clase_comision.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/clase_comisions', findAllClase_Comisions);
  app.get('/clase_comision/:id', findById);
  app.post('/clase_comision', addClase_Comision);
  app.put('/clase_comision/:id', updateClase_Comision);
  app.delete('/clase_comision/:id', deleteClase_Comision);

}