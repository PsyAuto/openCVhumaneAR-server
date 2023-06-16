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

// Get a user's neighbor keywords by id
router.get('/:id/neighborkeywords', (req, res) => {
  UserDAO.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).end();
      return res.json(user.NeighborKeywords);
    })
    .catch(error => res.status(400).json({ error: error.message }));
});

// Update a user's neighbor keywords by id
router.put('/:id/neighborkeywords', (req, res) => {
  UserDAO.update(req.params.id, { NeighborKeywords: req.body.NeighborKeywords })
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));
});

// Get a user's my keywords by id
router.get('/:id/mykeywords', (req, res) => {
  UserDAO.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).end();
      return res.json(user.MyKeywords);
    })
    .catch(error => res.status(400).json({ error: error.message }));
});

// Update a user's my keywords by id
router.put('/:id/mykeywords', (req, res) => {
  UserDAO.update(req.params.id, { MyKeywords: req.body.MyKeywords })
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));
});

// Get a user's new keywords by id
router.get('/:id/newkeywords', (req, res) => {
  UserDAO.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).end();
      return res.json(user.NewKeywords);
    })
    .catch(error => res.status(400).json({ error: error.message }));
});

// Update a user's new keywords by id
router.put('/:id/newkeywords', (req, res) => {
  UserDAO.update(req.params.id, { NewKeywords: req.body.NewKeywords })
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));
});

// Get a user's current stage by id
router.get('/:id/currentstage', (req, res) => {
  UserDAO.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).end();
      return res.json(user.CurrentStage);
    })
    .catch(error => res.status(400).json({ error: error.message }));
});

// Update a user's current stage by id
router.put('/:id/currentstage', (req, res) => {
  UserDAO.update(req.params.id, { CurrentStage: req.body.CurrentStage })
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));
});

// Get a user's article by id
router.get('/:id/myarticle', (req, res) => {
  UserDAO.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).end();
      return res.json(user.MyArticle);
    })
    .catch(error => res.status(400).json({ error: error.message }));
});

// Update a user's article by id
router.put('/:id/myarticle', (req, res) => {
  UserDAO.update(req.params.id, { MyArticle: req.body.MyArticle })
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));
});

// Get a user's neighbor articles by id
router.get('/:id/neighborarticles', (req, res) => {
  UserDAO.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).end();
      return res.json(user.NeighborArticles);
    })
    .catch(error => res.status(400).json({ error: error.message }));
});

// Update a user's neighbor articles by id
router.put('/:id/neighborarticles', (req, res) => {
  UserDAO.update(req.params.id, { NeighborArticles: req.body.NeighborArticles })
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));
});

module.exports = router;