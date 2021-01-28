var express = require('express');
var router = express.Router();
const index = require('./controllers');


router.get('/', index.getHome);
router.post('/validate-rule', index.postRule);

module.exports = router;