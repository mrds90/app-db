var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var claseSchema = new Schema({
	id: 		{ type: String },
	dia:		{ type: String },
	hora:		{ type: String },
	aula:		{ type: String }
});



module.exports = mongoose.model('Clase', claseSchema);