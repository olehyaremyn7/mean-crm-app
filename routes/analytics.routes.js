const {Router} = require('express');
const passport = require('passport');
const analyticsControllers = require('../controllers/analytics.controllers');
const router = Router();

// localhost:5000/api/analytics/overview
router.get('/overview', passport.authenticate('jwt', {session: false}), analyticsControllers.overviewController);

// localhost:5000/api//analytics
router.get('/', passport.authenticate('jwt', {session: false}), analyticsControllers.analyticsController);

module.exports = router;
