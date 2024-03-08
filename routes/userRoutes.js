const express = require("express")
const loginchecker = require("../currentLoginChecker/loginchecker")
const upload = require("../utils/multer")


const { registerUser, verifyRegisterUser, resetPassword, forgetPassword, getAllUsers, loginUsers, logoutUsers, changeProfilePic, updateUserName, updateUserPassword } = require("../controller/userController")

const router = express.Router()

router.post("/register", upload.single('photo'), registerUser)


router.get("/getAllUsers", getAllUsers)

router.post("/login", loginUsers)

router.post("/updateProfilePic", upload.single('photo'), changeProfilePic)

router.get("/loginchecker", loginchecker)

router.get("/logout", logoutUsers)

router.post("/updateUserName", updateUserName)

router.post("/updateUserPassword", updateUserPassword)

router.get("/verifyRegisterUser/:id/verify/:token", verifyRegisterUser)

router.post("/forgetPassword", forgetPassword)

router.post("/resetPassword/:userid/:token", resetPassword)

module.exports = router
