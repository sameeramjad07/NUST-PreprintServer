const express = require('express');
const userRouter = require('./user');
const paperRouter = require('./paper');
const fetchData = require('./fetchData');
const router = express.Router();

router.use('/users', userRouter); // Users API route
router.use('/papers', paperRouter); // Papers API route
router.use('/fetchData', fetchData); // Fetch Data API route

module.exports = router;