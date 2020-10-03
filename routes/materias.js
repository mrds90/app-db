//File: routes/materias.js
module.exports = function(app) {

  var Materia = require('../models/materia.js');

  //GET - Return all materias in the DB
  findAllMaterias = function(req, res) {
  	Materia.find(function(err, materias) {
  		if(!err) {
        console.log('GET /materias')
  			res.send(materias);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Materia with specified ID
  findById = function(req, res) {
  	Materia.findById(req.params.id, function(err, materia) {
  		if(!err) {
        console.log('GET /materia/' + req.params.id);
  			res.send(materia);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Materia in the DB
  addMateria = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var materia = new Materia({
  		id:    		req.body.dni,
  		nombre: 	req.body.nombre
 	});

  	materia.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(materia);
  };

  //PUT - Update a register already exists
  updateMateria = function(req, res) {
  	Materia.findById(req.params.id, function(err, materia) {
  		materia.id   	= req.body.petId;
  		materia.nombre   = req.body.nombre;

  		
  		materia.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(materia);
  		});
  	});
  }

  //DELETE - Delete a Materia with specified ID
  deleteMateria = function(req, res) {
  	Materia.findById(req.params.id, function(err, materia) {
  		materia.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/materias', findAllMaterias);
  app.get('/materia/:id', findById);
  app.post('/materia', addMateria);
  app.put('/materia/:id', updateMateria);
  app.delete('/materia/:id', deleteMateria);

}