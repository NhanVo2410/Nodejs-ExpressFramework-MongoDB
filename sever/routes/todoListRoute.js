/* eslint-disable import/order */
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const userHandlers = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/register', userHandlers.register);
router.post('/signin', userHandlers.sign_in);

module.exports = router;
