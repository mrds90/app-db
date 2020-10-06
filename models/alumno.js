var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var alumnoSchema = new Schema({
	dni: 		{ type: String },
	nombre:		{ type: String },
	apellido: 	{ type: String },
	mail:		{type: String } ,
	password:	{type: String } ,
});



module.exports = mongoose.model('Alumno', alumnoSchema);