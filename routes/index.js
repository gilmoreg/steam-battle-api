const express = require('express');
const Steam = require('../steam');

const router = express.Router();

router.get('/checkid/:id', (req, res, next) => {
  Steam.checkid(req.params.id)
    .then(id => res.status(200).json({ steamid: id }))
    .catch(() => res.status(404).json({ error: `Unable to verify ID ${req.params.id}.` }))
    .catch(next);
});

router.get('/player/:id', (req, res, next) => {
  Steam.player(req.params.id)
    .then(player => res.status(200).json({ player }))
    .catch(() => res.status(404).json({ error: `Player ${req.params.id} could not be found.` }))
    .catch(next);
});

module.exports = { router };
