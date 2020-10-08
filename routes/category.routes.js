const {Router} = require('express');
const passport = require('passport');
const categoryControllers = require('../controllers/category.controllers');
const upload = require('../middleware/upload.middleware');
const router = Router();

// localhost:5000/api/category
router.get('/', passport.authenticate('jwt', {session: false}), categoryControllers.getAllController);

// localhost:5000/api/category/:id
router.get('/:id', passport.authenticate('jwt', {session: false}), categoryControllers.getByIdController);

// localhost:5000/api/category/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), categoryControllers.removeController);

// localhost:5000/api/category
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), categoryControllers.createController);

// localhost:5000/api/category/:id
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), categoryControllers.updateController);

module.exports = router;
