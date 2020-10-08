const {Router} = require('express');
const passport = require('passport');
const positionControllers = require('../controllers/position.controllers');
const router = Router();

// localhost:5000/api/category/:categoryId
router.get('/:categoryId', passport.authenticate('jwt', {session: false}), positionControllers.getByCategoryIdController);

// localhost:5000/api/category
router.post('/', passport.authenticate('jwt', {session: false}), positionControllers.createController);

// localhost:5000/api/category/:id
router.patch('/:id', passport.authenticate('jwt', {session: false}), positionControllers.updateController);

// localhost:5000/api/category/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), positionControllers.removeController);


module.exports = router;
