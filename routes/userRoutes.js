const express = require("express")
const loginchecker = require("../currentLoginChecker/loginchecker")
const upload = require("../utils/multer")


const { registerUser, getAllUsers, loginUsers, logoutUsers , changeProfilePic } = require("../controller/userController")

const router = express.Router()



router.post("/register", upload.single('photo'), registerUser)


router.get("/getAllUsers", getAllUsers)

router.post("/login", loginUsers)

router.post("/updateProfilePic", upload.single('photo'), changeProfilePic)

router.get("/loginchecker", loginchecker)

router.get("/logout", logoutUsers)



module.exports = router
