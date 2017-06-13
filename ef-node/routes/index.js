const express = require('express');
const router = express.Router();
const Queries = require('../db/Queries.js');
const db = new Queries();
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'emotiface'
  });
});

router.get('/emo/:id', (req, res, next) => {
  db.addAllToDb();
  db.selectRound();
  res.render('index', {
    title: 'emo'
  });
});

module.exports = router;