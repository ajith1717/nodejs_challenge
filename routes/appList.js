
const { fetchApps ,addApps
} = require('../controllers/appListController');

const routes = [
 
  {
    method: 'POST',
    url: '/api/add-apps',
    handler: addApps,
  },
  {
    method: 'GET',
    url: '/api/fetch-apps',
    handler: fetchApps,
  }
  
]

module.exports = routes