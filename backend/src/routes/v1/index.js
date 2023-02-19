const express = require("express");
const videoRoute = require("./video.route");

const router = express.Router();

console.log("Faisal")


router.use("/videos", videoRoute);




module.exports = router;