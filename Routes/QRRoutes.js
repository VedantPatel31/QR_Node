const express = require('express');
const router = express.Router();

const qrController = require('../Controller/QRController');

router.post('/generate',qrController.generateQR);
router.put('/complete',qrController.completeQR);


module.exports = router;