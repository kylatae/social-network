// Using Mongoose to manage the MongoDB
const {connect, connection} = require('mongoose');

// Connecting to Heroku Mongo DB  or Local for testing
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thoughtsDB'

connect(connectionString);

module.exports = connection