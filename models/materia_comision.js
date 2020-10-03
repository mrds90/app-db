var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var materia_comisionSchema = new Schema({
	id_comision: 			{ type: String },
	id_materia:				{ type: String },
	
});



module.exports = mongoose.model('Materia_Comision', materia_comisionSchema);