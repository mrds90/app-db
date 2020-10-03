var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var profesorSchema = new Schema({
	dni: 		{ type: String },
	nombre:		{ type: String },
	apellido: 	{ type: String },
	mail:		{type: String } 
});



module.exports = mongoose.model('Profesor', profesorSchema);