const mongoose = require('mongoose')
const Schema = mongoose.Schema

let inventorySchema = new Schema({
  name: String,
  labels: [String],
  brandName: String,
  url: { type: String, unique: true },
  imageUrl: { type: String, unique: true },
  gender: Number,
  price: Number
})

const Inventory = mongoose.model('Inventory', inventorySchema)

const createEntry = ({name, labels, brandName, url, imageUrl, gender, price}, cb) => {
  new Inventory({
    name,
    labels,
    brandName,
    url,
    imageUrl,
    gender,
    price
  }).save()
  .catch(err => {
    cb(err)
  })
  .then(response => {
    cb(null, response)
  })
}

module.exports = {
  createEntry
}