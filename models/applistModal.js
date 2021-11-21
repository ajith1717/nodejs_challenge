const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const appSchema = new Schema({
	id: String,
	name: String,
	status: Boolean
});

const appList = mongoose.model('appList', appSchema);
module.exports = { appList };