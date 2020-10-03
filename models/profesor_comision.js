var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var profesor_comisionSchema = new Schema({
	id_comision: 			{ type: String },
	dni_profesor:				{ type: String },
	
});



module.exports = mongoose.model('Profesor_Comision', profesor_comisionSchema);