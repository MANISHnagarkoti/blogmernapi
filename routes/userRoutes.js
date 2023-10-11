const express = require("express")
const loginchecker = require("../currentLoginChecker/loginchecker")


const { registerUser, getAllUsers, loginUsers  , logoutUsers } = require("../controller/userController")

const router = express.Router()



router.post("/register", registerUser)


router.get("/getAllUsers", getAllUsers)

router.post("/login", loginUsers)

router.get("/loginchecker", loginchecker)

router.get("/logout", logoutUsers)

module.exports = router
