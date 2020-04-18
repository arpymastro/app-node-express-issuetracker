var express = require('express');
var router = express.Router();
var issue = require('./issue.js')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Issue Tracker'} );
});

module.exports = router;
