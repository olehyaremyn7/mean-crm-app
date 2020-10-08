const {Router} = require('express');
const passport = require('passport');
const orderControllers = require('../controllers/order.controllers');
const router = Router();

// localhost:5000/api/order
router.get('/', passport.authenticate('jwt', {session: false}), orderControllers.getAllController);

// localhost:5000/api/order
router.post('/', passport.authenticate('jwt', {session: false}), orderControllers.createController);


module.exports = router;
