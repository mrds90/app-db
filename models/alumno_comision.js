var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var alumno_comision_materiaSchema = new Schema({
	id_comision: 			{ type: String },
	id_alumno:				{ type: String },
	id_materia:				{ type: String },
	
});



module.exports = mongoose.model('Alumno_Comision', alumno_comision_materiaSchema);