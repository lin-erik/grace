const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CLARIFAI_MODEL_ID = require('../../config')

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

const getInventory = (labels, cb) => {
  Inventory.find({labels}).exec((err, results) => {
    if (err) cb(err)

    cb(null, results)
  })
}

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

const labelAll = (clarifai, cb)=>{
  Inventory.find().exec((err,results)=>{
    let promises = results.map((result, ind)=>{
      setTimeout(() => {
        return new Promise((resolve,reject)=>{
          clarifai.models.predict(CLARIFAI_MODEL_ID, result.imageUrl).then(
            function(response) {
              let labels = response.outputs[0].data.concepts.map(concept => concept.name)[0]
              console.log({ labels })
              Inventory.findByIdAndUpdate(result._id, {
                $set: { labels }
              }).then(() => resolve())
            },
            function(err) {
              // console.error(err.data)
              resolve()
            }
          )
        })
      }, 1000 * ind);
    })
    Promise.all(promises).then(()=>cb())
  })
}

module.exports = {
  getInventory,
  createEntry,
  labelAll,
  Inventory
}

// (response,err)=>{
//   console.log('butt')
//   if(err) {
//     console.log('err')
//     resolve()
//   }
//   else{
//     let labels = response.outputs[0].data.concepts.map(concept=>concept.name)[0]
//     console.log({labels})
//     Inventory.findByIdAndUpdate(result._id,{
//       $set:{labels}
//     }).then(()=>resolve())
//   }
// }