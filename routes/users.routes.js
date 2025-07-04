const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);

const { isAuthenticated } = require("../middlewares/auth.middleware");
router.get('/:id', isAuthenticated, usersController.getProfileById);


module.exports = router;
