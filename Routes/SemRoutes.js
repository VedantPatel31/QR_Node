const express = require('express')
const router = express.Router();

const SemController = require('../Controller/SemController');

router.post('/add',SemController.addSem);
router.get('/getAll',SemController.getAllSem);
module.exports = router;