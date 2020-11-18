/* eslint-disable import/order */
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const site = require('../controllers/sites.controller');
const router = require('express').Router();

router.get('/', site.GetAll);
router.get('/:id', site.GetSiteByID);
router.post('/', site.Post);
router.put('/:id', site.Put);
router.delete('/:id', site.Delete);
// router.post("/",site.insertBaseData)
module.exports = router;
