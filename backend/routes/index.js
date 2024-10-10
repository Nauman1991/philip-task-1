const express = require('express');
const router = express.Router();

const githubRouter = require('./githubRouter')


router.use('/github', githubRouter);

module.exports = router;
