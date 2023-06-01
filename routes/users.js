const express = require('express');
const router = express.Router();
const UserDAO = require('./UserDAO');

// Create a new user
router.post('/', (req, res) => {
  UserDAO.create(req.body)
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));
});

// Get all users
router.get('/', (req, res) => {
  UserDAO.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json({ error: error.message }));
});

// Get a user by id
router.get('/:id', (req, res) => {
    UserDAO.findById(req.params.id)
      .then(user => {
        if (!user) return res.status(404).end();
        return res.json(user);
      })
      .catch(error => res.status(400).json({ error: error.message }));
  });

// Get a user by name
router.get('/name/:name', (req, res) => {
    UserDAO.findByName(req.params.name)
        .then(user => {
            if (!user) return res.status(404).end();
            return res.json(user);
        })
        .catch(error => res.status(400).json({ error: error.message }));
});

// Update a user
router.put('/:id', (req, res) => {
  UserDAO.update(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));
});

// Delete a user
router.delete('/:id', (req, res) => {
  UserDAO.delete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => res.status(400).json({ error: error.message }));
});

module.exports = router;