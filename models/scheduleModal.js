const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;




const scheduleSchema = new Schema({
  id:String,
  user_id: String,
  days_active: [],
  from: String,
  to: String,
  status:Boolean
});

const schedule = mongoose.model('schedule', scheduleSchema);
module.exports = { schedule };