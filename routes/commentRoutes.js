const express = require("express")


const { postComment, getComment, deleteComment } = require("../controller/commentController")

const router = express.Router()


// {{{{{{{{{{{blog crud}}}}}}}}}}}

router.post("/postComment", postComment)

// {{{{{{{{{{{{{{get comment}}}}}}}}}}}}}}

router.get("/getComment/:blogid", getComment)

router.delete("/deleteComment/:commentid/:blogid", deleteComment)

module.exports = router