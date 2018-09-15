const inventory = require('../models/inventory.js')

module.exports = {
  inventory: {
    getInventory: (req, res) => {
      // Worker to identify image labels, pass labels to getInventory
      inventory.getInventory(labels, (err, results) => {
        if (err) res.status(404).send('Error fetching inventory')

        res.send(results)
      })
    },
    createEntry: (req, res) => {
      inventory.createEntry(req.body, (err, result) => {
        if (err) res.status(404).send('Error creating entry')

        res.send(result)
      })
    }
  }
}