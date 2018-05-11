var express = require('express');
var router = express.Router();

var messages = require("../controllers/MessagesController.js");

// Get all messages
router.get('/pages/:page', function(req, res) {
    messages.list(req, res);
});

router.get('/', function(req, res) {
    messages.list(req, res);
});


// Get single message by id
router.get('/show/:id', function(req, res) {
    messages.show(req, res);
});

// Create message
router.get('/create', function(req, res) {
    messages.create(req, res);
});

// Save message
router.post('/save', function(req, res) {
   messages.save(req, res);
});

// Edit message
router.get('/edit/:id', function(req, res) {
    messages.edit(req, res);
});

// Update message
router.post('/update/:id', function(req, res) {
    messages.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
    messages.delete(req, res);
});

module.exports = router;
