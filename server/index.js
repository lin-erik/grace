const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const controller = require('./controllers/controller.js')

app.post('/inventory', controller.inventory.createEntry)


app.listen(port, () => {
  console.log('Server connected on', port)
})