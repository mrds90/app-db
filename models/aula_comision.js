var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var aula_comisionSchema = new Schema({
	id_comision: 			{ type: String },
	id_aula:				{ type: String },
	
});



module.exports = mongoose.model('Aula_Comision', aula_comisionSchema);