var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var Entryschema = new Schema({
	user:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	name:{
		type: String,
		max: 50
	}
	teams: [{
		teamId: Number
	}],
	paid:{
		type: Boolean
		default: false
	}
});

module.exports = mongoose.model('Entry', EntrySchema);