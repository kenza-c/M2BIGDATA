const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const dbURL = new Schema({
  // Define your schema fields here
  url: { type: String},
});
// change db 
const db = model('db', dbURL);
module.exports =db
