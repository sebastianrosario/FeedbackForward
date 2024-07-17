const mongoose = require("mongoose");

const server = "localhost";
const database = "ff_users";
const port = '27017';
const mongo_authentication = "ff_login:test123";

const connectionString = `mongodb://${mongo_authentication}@${server}:${port}/${database}?authSource=feedback-forward`;

class Database {
  constructor() {
    this._connect()
  }

_connect() {
     mongoose.connect(connectionString)
       .then(() => {
         console.log('Mongo database connection successful')
       })
       .catch(err => {
         console.error('Mongo database connection error')
         console.error(err)
         console.error(connectionString)
       })
  }
}

module.exports = new Database()
