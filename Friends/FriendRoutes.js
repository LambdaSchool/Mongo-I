const express = require('express');
const friendRouter = express.Router();
const Friend = require('./FriendModel');

friendRouter.post('/', function(req, res) {
  const friendInfo = req.body;
  const { firstName, lastName, age } = friendInfo;
  if (!firstName || !lastName || !age) {
    res.status(400).json({ errorMessage: 'Please provide firstName, lastName and age for the friend.' });
  }
  const friend = new Friend(friendInfo);
  friend.save()
    .then(friend => {
      res.status(201).json(friend);
    })
    .catch(err => {
      if (err._message === 'Friend validation failed') {
        res.status(400).json({ errorMessage: 'Age must be a whole number between 1 and 120'});
      }
      res.status(500).json({ errorMessage: 'There was an error while saving the friend to the database', err});
    });
});

friendRouter.get('/', function(req, res) {
  Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ error: 'the information could not be retrieved.' })
    });
});

module.exports = friendRouter;
