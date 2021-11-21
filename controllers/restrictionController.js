const { restriction } = require('../models/restrictionModel');
const { appList } = require('../models/applistModal');


const moment = require('moment-timezone');
const { uuid } = require('uuidv4');




// Get all work time
// we have  pass 
// user's id as user_id
// In restriction page tab which he selected 
// if user selects working time means  - has to pass is_worktime:true 
// else case  - is_worktime:false

// and result will be 
// if is_worktime :  true means 
//            result   status,message,blocked_apps,other_apps
// other condition is_worktime = false means result   will be  status,message,limit_apps,other_apps 

const fetchAppItems = async (req, reply) => {
	try {
		var total_a = await appList.find()
		var total_apps = JSON.parse(JSON.stringify(total_a));
		let res_a = await restriction.find({ is_active: true, user_id: req.body.user_id  , is_worktime: req.body.is_worktime})
		var total_blocked_apps = JSON.parse(JSON.stringify(res_a));
		var blocked_id = total_blocked_apps.map((e) => {
			return e.app_id
		})
		let total_other_apps =
			blocked_id.length > 0 ?
				total_apps.filter(data => {
					return blocked_id.indexOf(data.id) == -1
				}) : total_apps
		if (total_apps) {
			var data ={
				status: 1,
				other_apps: total_other_apps, message: "App has been fetched successfully"
			}
			if(req.body.is_worktime){
				data.blocked_apps =  total_blocked_apps
			}else{
				data.limit_apps =  total_blocked_apps
			}

			reply.send(data);
		} else {
			reply.send({ status: 0, message: "No records found" });
		}
	} catch (err) { console.log(err) }
}



// Edit work time
// this is used to change block and unblock apps 
// for blocking app
// we have to pass id, user_id, app_id , is_worktime  and is_active = true
// for unblocking apps 
// we have to pass id, user_id, app_id , is_worktime  and is_active = false
const updateApps = async (req, reply) => {
	try {
		var data = req.body
		if (data.is_active) {
		    data.id= uuid();
			var data_upload =  new restriction(data)
			var send_data = await data_upload.save()
		} else {
			var data_upload1 = await restriction.deleteOne({ id: data.id})
		}
		
		if (send_data || data_upload1) {
			reply.send({ status: 1, message: "App has been updated successfully" });
		} else {
			reply.send({ status: 0, message: "Failed to updat work time." });

		}
	} catch (err) { console.log(err) }
}


// to add time limit for apps
// we have to pass
// {
//     "user_id":"1", - users id
//     "app_id":"f03a4800-f18e-48dc-8165-85d9fbbce948", - apps id
//     "is_worktime":false,   - it should be always false because it was in secound tab of restriction page
//     "weekend": "10:22",   - time should we in 24 hr format
//     "weekdays": "11:22"   - time should we in 24 hr format
// }

const setTimeLimit = async (req, reply) => {
	try {
		var data = req.body
		if (!data.is_worktime) {
		    data.id= uuid();
			data.is_active = true
			var data_upload =  new restriction(data)
			var send_data = await data_upload.save()
		}
		
		if (send_data) {
			reply.send({ status: 1, message: "Time limit has been added successfully" });
		} else {
			reply.send({ status: 0, message: "Failed to add time limit." });

		}
	} catch (err) { console.log(err) }
}



// to edit time limit for apps
// we have to pass
// {
//     "user_id":"1", - users id
//     "app_id":"f03a4800-f18e-48dc-8165-85d9fbbce948", - apps id
//     "is_worktime":false,   - it should be always false because it was in secound tab of restriction page
//     "weekend": "10:22",   - time should we in 24 hr format
//     "weekdays": "11:22"   - time should we in 24 hr format
// }

const updateTimeLimit = async (req, reply) => {
	try {
		var data = req.body
		var data_upload = await restriction.updateOne({app_id:data.app_id , is_worktime:false },{$set:data})
		if(data_upload){
			reply.send({ status: 1, message: "time limit has beed updated successfully" });
		}else{
		reply.send({ status: 0, message: "Failed to update time limit." });

		}
	} catch (err) { console.log(err) }
}



module.exports = {
	fetchAppItems, updateApps , setTimeLimit,updateTimeLimit , updateTimeLimit
};
