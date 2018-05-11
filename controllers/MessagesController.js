var Message = require("../models/Message");
var messagesController = {};

var perPage = 4;

messagesController.list = function(req, res) {

    var page = req.params.page || 1;

    Message.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, messages) {
            Message.count().exec(function(err, count) {
                if (err) return next(err);
                res.render('../views/messages/index', {
                    messages: messages,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            });
        });
};

messagesController.show = function(req, res) {
    Message.findOne({_id: req.params.id}).exec(function (err, message) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/messages/show", {message: message});
        }
    });
};

messagesController.create = function(req, res) {
    console.log('create');
    res.render("../views/messages/create");
};

messagesController.save = function(req, res) {
    var message = new Message(req.body);

    message.save(function(err) {
        if(err) {
            console.log(err);
            res.render("../views/messages/create");
        } else {
            console.log("Message successfully sent.");
            res.redirect("/messages/show/" + message._id);
        }
    });
};

messagesController.edit = function(req, res) {
    Message.findOne({_id: req.params.id}).exec(function (err, message) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/messages/edit", {message: message});
        }
    });
};

messagesController.update = function(req, res) {

    var page = req.params.page || 1;

    Message.findByIdAndUpdate(req.params.id,
        { $set:
            { text: req.body.text }},
        { new: true }, function (err, message) {
        if (err) {
            console.log(err);
            res.render("../views/messages/edit", {message: req.body});
        }

        Message.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, messages) {
                Message.count().exec(function(err, count) {
                    if (err) return next(err);
                    res.render('../views/messages/index', {
                        messages: messages,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                });

           });

    });

};


messagesController.delete = function(req, res) {
    Message.remove({_id: req.params.id}, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Message deleted!");
            res.redirect("/messages");
        }
    });
};


module.exports = messagesController;