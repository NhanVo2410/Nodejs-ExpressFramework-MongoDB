/* eslint-disable import/order */
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const user = require('../controllers/users.controller');
const router = require('express').Router();

router.get('/', user.GetAll);
router.get('/:id', user.GetSiteByID);
router.post('/', user.Post);
router.put('/:id', user.Put);
router.delete('/:id', user.Delete);
router.get('/get-ticket-by-time', user.GetUserByTime);

module.exports = router;
