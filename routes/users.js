var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

// /users GET
// /users/:userId GET
router.get('/:userid',  function(req, res) {
  User.findByPospareId(req.params.userid, function(err, user) {
    if (err) res.send(err);
    if(!user){
      res.sendStatus(204);
    }
    else{
      res.json(user);
    }
    
    
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("plo");
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});



module.exports = router;
