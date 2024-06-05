const express = require('express');
const router = express.Router()

const attendanceController = require('../Controller/AttendanceController');

// router.post('/add/:id/:qrText'+attendanceController.addAttendance)
router.post('/add',attendanceController.addAttendance);
router.post('/getAll',attendanceController.getAllAttendance);
router.post('/getSubjectWise',attendanceController.getSubjectWiseAttendance)
router.post('/liveView',attendanceController.getLive);
module.exports = router;