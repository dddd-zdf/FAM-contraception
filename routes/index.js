var express = require('express');
var router = express.Router();

const record_controller = require("../controllers/recordController");

router.get("/", record_controller.index);
router.get("/record/create", record_controller.record_create_get);
router.post("/record/create", record_controller.record_create_post);
router.get("/record/:id/delete", record_controller.record_delete_get);
router.post("/record/:id/delete", record_controller.record_delete_post);
router.get("/record/:id/update", record_controller.record_update_get);
router.post("/record/:id/update", record_controller.record_update_post);
router.get("/record/:id", record_controller.record_detail);
router.get("/records", record_controller.record_list);

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/



module.exports = router;
