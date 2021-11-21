const timeout = require('fastify-server-timeout');
const mongoose = require('mongoose');


 mongoose.connect('mongodb+srv://node_user:app_blocker@cluster0.rnck0.mongodb.net/app_blocker?retryWrites=true&w=majority').then(res=>{
   console.log('mongo connected');
 }).catch(err=>{
  console.log(err);
 });

const fastify = require('fastify')({
  bodyLimit: 10485760
});


const schedule = require('./routes/schedule');
const appList = require('./routes/appList');
const restriction = require('./routes/restriction')


fastify.register(require('fastify-cors'), { 
  // put your options here
})  


fastify.register(timeout, {
  serverTimeout: 240000 //ms
});


// iterating over all the routes and registering them with fastify
schedule.forEach(route => fastify.route(route));
appList.forEach(route => fastify.route(route));
restriction.forEach(route => fastify.route(route));


//launching server at port : 3000 in local environment
fastify.listen(process.env.PORT || 4000, '0.0.0.0', (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`server running at ${fastify.server.address().port}`)
})
