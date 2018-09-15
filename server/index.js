const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const parser = require('body-parser')
const Clarifai = require('clarifai')
const { CLARIFAI_API, CLARIFAI_MODEL_ID } = require('../config')
const controller = require('./controllers/controller')
const model = require('./models/inventory')
const fileUpload = require('express-fileupload')

const app = express()
/****** express middleware ******/
app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(fileUpload())
/******* end of middleware ******/

app.use(express.static(__dirname + '/../client/dist'))

const clarifai = new Clarifai.App({
  apiKey: CLARIFAI_API
})

app.post('/api/analyze', (req, res) => {
  let image
  if (req.files && req.files.image)
    image = Buffer.from(req.files.image.data).toString('base64')
  if (req.body.imageUrl) image = req.body.imageUrl

  clarifai.models.predict(CLARIFAI_MODEL_ID, image).then(
    function(response) {
      let labels = [
        response.outputs[0].data.concepts.map(concept => concept.name)[0]
      ]
      model.getInventory(labels, (err, results) => {
        if (err) return res.send(err)
        res.send(results)
      })
    },
    function(err) {
      res.send(err)
    }
  )
})

const port = process.env.PORT || 3000

app.get('/inventory', controller.inventory.getInventory)
app.post('/inventory', controller.inventory.createEntry)

app.listen(port, () => {
  console.log('Server connected on', port)
})
