var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var profesor_comision_meteriaSchema = new Schema({
	id_comision: 			{ type: String },
	id_profesor:			{ type: String },
	id_materia:				{ type: String },
	
});



module.exports = mongoose.model('Profesor_Comision', profesor_comision_meteriaSchema);