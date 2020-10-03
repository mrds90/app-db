var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var materiaSchema = new Schema({
	id: 		{ type: String },
	nombre:		{ type: String },
});



module.exports = mongoose.model('Materia', materiaSchema);