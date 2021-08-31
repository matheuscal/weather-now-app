const router = require('express').Router();
const {getIndexRedirect, getIndex} = require('../controls/navigationControl');


router.get('/', getIndexRedirect, getIndex);
router.get('/index', (req, res) => {res.redirect('/')});

module.exports = router;

