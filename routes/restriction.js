
const { fetchAppItems , updateApps , setTimeLimit , updateTimeLimit} = require('../controllers/restrictionController');

const routes = [
 
  
  {
    method: 'POST',
    url: '/api/fetch-apps-res',
    handler: fetchAppItems,
  },
  {
    method: 'POST',
    url: '/api/update-block-apps',
    handler: updateApps,
  },
  {
    method: 'POST',
    url: '/api/set-apps-time-limit',
    handler: setTimeLimit,
  },
  {
    method: 'POST',
    url: '/api/update-apps-time-limit',
    handler: updateTimeLimit,
  }
  
]

module.exports = routes