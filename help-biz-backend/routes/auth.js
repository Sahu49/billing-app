const { singUpHandler, signInHandler } = require("../controllers/auth")

const router = require("express").Router()


router.post("/signup/", singUpHandler)
router.post("/signin/", signInHandler)

module.exports = router;