const { appList } = require('../models/applistModal');

const { uuid } = require('uuidv4');






// Add work time 
// we have to pass app as "name" 

const addApps = async (req, reply) => {
	try {
		var data = req.body
		data.id= uuid();
		var data_upload = new appList(data)
		var send_data = await data_upload.save()
		if(send_data){
			reply.send({ status: 1, message: "App has been added successfully" });
		}else{
		reply.send({ status: 0, message: "Failed to add app." });

		}
	} catch (err) { console.log(err) }
}

// Get all apps 
const fetchApps = async (req, reply) => {
	try {
		var data =  await appList.find()
		if(data){
			var send_data = JSON.parse(JSON.stringify(data));
			reply.send({ status: 1, data:send_data, message: "App fetched successfully" });
		}else{
		reply.send({ status: 0, message: "No records found" });
		}
	} catch (err) { console.log(err) }
}



module.exports = {
	fetchApps ,addApps
};
