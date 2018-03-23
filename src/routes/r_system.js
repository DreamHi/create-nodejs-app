const express    = require("express");
const router     = express.Router();
const response   = require("../core/response");
const ctrlUser   = require("../modules/system/controllers/ctrl_user");

router.get("/logout", (req, res) => {
  ctrlUser.logout(req, res, (err, result) => {
    response.send(req, res, err, result);
  })
});

module.exports = router;