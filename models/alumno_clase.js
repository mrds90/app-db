var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var alumno_claseSchema = new Schema({
	id_clase: 			{ type: String },
	dni_alumno:				{ type: String },
	
});



module.exports = mongoose.model('Alumno_Clase', alumno_claseSchema);