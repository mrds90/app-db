var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var aulaSchema = new Schema({
	id: 		{ type: String },
	nombre:		{ type: String },
});



module.exports = mongoose.model('Aula', aulaSchema);