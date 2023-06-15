const express = require("express");
const router = express.Router();

router.route("/chatbox").get().post();

module.exports = router;
