
const { addworkTime ,fectItems ,updateItems} = require('../controllers/scheduleController');

const routes = [
 
  {
    method: 'POST',
    url: '/api/add-work-time',
    handler: addworkTime,
  },
  {
    method: 'GET',
    url: '/api/fetch-work-time',
    handler: fectItems,
  },
  {
    method: 'PUT',
    url: '/api/edit-work-time',
    handler: updateItems,
  },
  
]

module.exports = routes