var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var alumno_comisionSchema = new Schema({
	id_comision: 			{ type: String },
	id_alumno:				{ type: String },
	
});



module.exports = mongoose.model('Alumno_Comision', alumno_comisionSchema);