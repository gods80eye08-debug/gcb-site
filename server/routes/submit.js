const express = require('express');
const { submitData } = require('../controllers/submitController');

const router = express.Router();

router.post('/', submitData);

module.exports = router;

