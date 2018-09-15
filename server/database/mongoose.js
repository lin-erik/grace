const mongoose = require('mongoose')
const { inventoryURI } = require('../../config.js')

// Inventory DB

mongoose.connect(inventoryURI);
let inventoryDB = mongoose.connection;
inventoryDB.on('error', err => {
  if (err) console.error('Error connecting to inventory database')
})
inventoryDB.once('open', function() {
  console.log("db connected")
});