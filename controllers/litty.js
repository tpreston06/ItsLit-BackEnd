const express = require('express');
const router = express.Router();
const Litty = require('../models/litty.js');
// Remember INDUCES

// Seeding...
router.get('/seed', async (req, res) => {
    await Inventory.deleteMany({})
    await Inventory.create(inventoryData);
    res.redirect('/api/vi/music')
});

// Index
router.get('/', (req, res) => {
    Litty.find({}, (err, foundLitty) => {
        res.json(foundLitty);
    });
});

// New - Will be handled by React application
// Delete
router.delete('/:id', (req, res) => {
    Litty.findByIdAndRemove(req.params.id, (err, deletedItsLit) => {
        res.json(deletedItsLit);
    });
});

// Update
router.put('/:id', (req, res) => {
    Litty.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedItsLit) => {
        res.json(updatedItsLit);
    });
});

// Create
router.post('/', (req, res) => {
    Litty.create(req.body, (err, createdItsLit) => {
        res.json(createdItsLit); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// Edit - Will be handled by React application
// Show
router.get('/:id', (req, res) =>{
    Litty.findById(req.params.id, (err, foundItsLit) =>{
        res.json(foundItsLit);
    });
});

module.exports = router;