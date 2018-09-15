const inventory = require('../models/inventory.js')

module.exports = {
  inventory: {
    createEntry: (req, res) => {
      inventory.createEntry(req.body, (err, result) => {
        if (err) res.status(404).send('Error creating entry')

        res.send(result)
      })
    }
  }
}