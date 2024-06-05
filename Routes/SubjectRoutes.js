const express = require('express');
const router = express.Router();

const subjectController = require('../Controller/SubjectController');

router.post('/add',subjectController.addSubject);
router.get('/getALl',subjectController.getALlSubject);
module.exports = router;