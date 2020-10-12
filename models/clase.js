
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var claseSchema = new Schema({
	aula: 		{ type: String },
	inicio:		{ type: Date },
	fin:		{ type: Date }
	
});



module.exports = mongoose.model('Clase', claseSchema);