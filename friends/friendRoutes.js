const express = require('express');
const mongoose = require('mongoose');

const Friend = require('./friendModel.js');

const friendRouter = express.Router();

friendRouter.get('/', (req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).send(friends);
    })
    .catch(err => {
      res.status(400).send({ error: "The information could not be retrieved." });
    });
});

friendRouter.get('/:id', (req, res) => {
  Friend.findById(req.params.id)
    .then(friend => {
      if(friend) res.status(200).send(friend);
      else res.status(404).send({ message: "The friend with the specified ID does not exist." });
    })
    .catch(err => {
      res.status(500).send({ error: "The information could not be retrieved." });
    });
});

friendRouter.post('/', (req, res) => {
  const friend = new Friend(req.body);
  friend.validate(err => {
    if(err) res.status(400).send({ errorMessage: Object.values(err.errors)[0].message });
  });
  friend
    .save()
    .then(friend => {
      res.status(201).send(friend);
    })
    .catch(err => {
      res.status(500).send({ error: "There was an error while saving the friend to the database" });
    })
})