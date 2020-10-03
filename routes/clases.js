//File: routes/clases.js
module.exports = function(app) {

  var Clase = require('../models/clase.js');

  //GET - Return all clases in the DB
  findAllClases = function(req, res) {
  	Clase.find(function(err, clases) {
  		if(!err) {
        console.log('GET /clases')
  			res.send(clases);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Clase with specified ID
  findById = function(req, res) {
  	Clase.findById(req.params.id, function(err, clase) {
  		if(!err) {
        console.log('GET /clase/' + req.params.id);
  			res.send(clase);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Clase in the DB
  addClase = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var clase = new Clase({
  		id:    		req.body.dni,
  		nombre: 	req.body.nombre
 	});

  	clase.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(clase);
  };

  //PUT - Update a register already exists
  updateClase = function(req, res) {
  	Clase.findById(req.params.id, function(err, clase) {
  		clase.id   	= req.body.petId;
  		clase.nombre   = req.body.nombre;

  		
  		clase.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(clase);
  		});
  	});
  }

  //DELETE - Delete a Clase with specified ID
  deleteClase = function(req, res) {
  	Clase.findById(req.params.id, function(err, clase) {
  		clase.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/clases', findAllClases);
  app.get('/clase/:id', findById);
  app.post('/clase', addClase);
  app.put('/clase/:id', updateClase);
  app.delete('/clase/:id', deleteClase);

}