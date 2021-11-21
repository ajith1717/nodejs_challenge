const { schedule } = require('../models/scheduleModal');

const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);


const { uuid } = require('uuidv4');



// this function is used to change the time to date for finding range between two dates.
const getTime = (time) => {
	var today = new Date()
	var today_time = time.split(":")
	today.setHours(today_time[0])
	today.setMinutes(today_time[1])
	return today
}




// Add work time 
// we have  pass 
// user's id as user_id
// form time as from
// to time as to
// days which selected as days_active like [1,2,3,4,5,6,7]
// 1 - sunday , 2- monday , 3-tuesday , 4-wednesday , 5-thursday, 6-friday, 7-saturday


const addworkTime = async (req, reply) => {
	try {
		var data = req.body
		data.id = uuid();
		for (let date of data.days_active) {
			var check_time = await schedule.find({ user_id: data.user_id, days_active: date })
			var range = moment.range(getTime(data.from), getTime(data.to));
			for (let i of check_time) {
				let range2 = moment.range(getTime(i.from), getTime(i.to));
				let result = range.overlaps(range2);
				if (result) {
					reply.send({ status: 0, message: "Date has been overlapped" });
					return
				}
			}
		}

		var data_upload = new schedule(data)
		var send_data = await data_upload.save()

		if (send_data) {
			reply.send({ status: 1, message: "Work time has been scheduled successfully" });
		} else {
			reply.send({ status: 0, message: "Failed to updat work time." });

		}
	} catch (err) { console.log(err) }
}



// Get all work time
const fectItems = async (req, reply) => {
	try {
		var data = await schedule.find()
		if (data) {
			var send_data = JSON.parse(JSON.stringify(data));
			reply.send({ status: 1, data: send_data, message: "Work time has been fetched successfully" });
		} else {
			reply.send({ status: 0, message: "No records found" });
		}
	} catch (err) { console.log(err) }
}





// Edit work time
// for this edit option we have to all thinks like addworkTime() and 
// we have to pass id of the edited time 
const updateItems = async (req, reply) => {
	try {
		var data = req.body
		var data_upload = await schedule.updateOne({ id: data.id }, { $set: data })
		if (data_upload) {
			reply.send({ status: 1, message: "Work time has been updated successfully" });
		} else {
			reply.send({ status: 0, message: "Failed to updat work time." });

		}
	} catch (err) { console.log(err) }
}




module.exports = {
	addworkTime, fectItems, updateItems
};
