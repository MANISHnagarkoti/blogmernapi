const express = require("express")


const {getallcat } = require("../controller/categoryController")

const router = express.Router()


// {{{{{{{{{{{blog crud}}}}}}}}}}}

router.get("/allcategories", getallcat)




module.exports = router