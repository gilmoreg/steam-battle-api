const express = require('express');
const Steam = require('../steam');

const router = express.Router();

router.get('/checkid/:id', (req, res, next) => {
  Steam.checkid(req.params.id)
    .then(id => res.status(200).json({ steamid: id }))
    .catch(err => res.status(204).json({ error: err }))
    .catch(next);
});

router.get('/player/:id', (req, res, next) => {
  Steam.player(req.params.id)
    .then(player => res.status(200).json({ player }))
    .catch(err => res.status(500).json({ error: err }))
    .catch(next);
});

module.exports = { router };
