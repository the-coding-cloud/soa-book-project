const router = require('express').Router();
const apiRoute = require('./api');

router.use('/gate/v1', apiRoute);
module.exports = router;
