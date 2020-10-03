var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var comisionSchema = new Schema({
	id: 				{ type: String },
	nombre:				{ type: String },
	clasesTotales:		{ type: String },
});



module.exports = mongoose.model('Comision', comisionSchema);