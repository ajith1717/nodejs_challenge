const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;





const restrictionSchema = new Schema({
  id: String,
  app_id: String,
  user_id: String,
  is_worktime: Boolean,
  is_active: Boolean,
  weekend: String,
  weekdays: String,
});

const restriction = mongoose.model('restriction', restrictionSchema);
module.exports = { restriction };