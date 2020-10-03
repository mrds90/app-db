var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var clase_comisionSchema = new Schema({
	id_comision: 			{ type: String },
	id_clase:				{ type: String },
	
});



module.exports = mongoose.model('Clase_Comision', clase_comisionSchema);