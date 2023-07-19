const express = require('express');
const router = express.Router();
const GlobalSettingsDAO = require('./GlobalSettingsDAO');

// GET global system settings
router.get('/', async (req, res) => {
  try {
    const settings = await GlobalSettingsDAO.get();
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// PUT global system settings
router.put('/', async (req, res) => {
  try {
    const settings = await GlobalSettingsDAO.update(req.body);
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


// GET global system settings currentStage
router.get('/currentStage', async (req, res) => {
    try {
        const settings = await GlobalSettingsDAO.get();
        res.json(settings.CurrentStage);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// PUT global system settings currentStage
router.put('/currentStage', async (req, res) => {
    try {
        const settings = await GlobalSettingsDAO.update(req.body);
        res.json(settings.CurrentStage);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET global system settings radius
router.get('/radius', async (req, res) => {
  try {
    const settings = await GlobalSettingsDAO.get();
    res.json(settings.Radius);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// PUT global system settings radius
router.put('/radius', async (req, res) => {
  try {
    const settings = await GlobalSettingsDAO.update(req.body);
    res.json(settings.Radius);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;