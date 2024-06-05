const express = require('express');
const router = express.Router();
const studentController = require('../Controller/StudentController');





router.post('/add',studentController.registerUserWithEnc);
router.post('/login',studentController.loginUserWithEnc);
router.put('/update/:id',studentController.updateStudent);
router.post('/view',studentController.getAllStudent);
// router.put('/update//:id',adaController.updateAda);
// router.post('/user',studentController.registerStudent);
// router.post('/login',studentController.loginStudent); 
module.exports = router; 