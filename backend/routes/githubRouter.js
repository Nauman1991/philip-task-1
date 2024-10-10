const express = require('express');
const router = express.Router();

const githubController = require('../controllers/githubController');

router.get('/auth', githubController.initiateAuth);
router.get('/callback', githubController.handleCallback);
router.get('/status', githubController.getStatus);
router.delete('/remove', githubController.removeIntegration);

module.exports = router;