const router = require("express").Router();

router.use("/places", require('./place.routes'))
router.use("/auth", require('./auth.routes'))
router.use("/comment", require('./comment.routes'))
router.use("/user", require('./user.routes'))
router.use("/upload", require('./upload.routes'))

module.exports = router;
