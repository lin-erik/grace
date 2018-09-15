const mongoose = require('mongoose')
const { inventoryURI } = require('../config.js')

// Inventory DB
const inventoryDB = mongoose.createConnection(inventoryURI)

inventoryDB.on('error', err => {
  if (err) console.error('Error connecting to inventory database')
})

inventoryDB.once('open', () => {
  console.log('Connected to inventory database')
})

module.exports = {
  inventoryDB
}