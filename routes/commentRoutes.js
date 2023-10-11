const express = require("express")


const {postComment , getComment } = require("../controller/commentController")

const router = express.Router()


// {{{{{{{{{{{blog crud}}}}}}}}}}}

router.post("/postComment", postComment)

// {{{{{{{{{{{{{{get comment}}}}}}}}}}}}}}

router.get("/getComment/:blogid", getComment)

module.exports = router