const express = require('express');
const router = express.Router();
const docController = require('../controllers/doc.controller');


router.post('/reg-user', docController.registerUser);
router.get('/get-user', docController.getUser);
router.post('/add-doc', docController.addDocument);
router.post('/remove-doc', docController.removeDocument);

module.exports = router;
