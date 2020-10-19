// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const site = require("../controllers/sites.controller");
var router = require("express").Router();

router.get("/site", site.getAll);
module.exports = router;