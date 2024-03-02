const express = require("express")
const upload = require("../utils/multer")


const { getAllBlog, createBlog, updateBlog, deleteBlog, singleBlog, currentUserBlogs, blogByCategory, likeBlog, unlikeBlog, getEditedBlogInfo, trendingBlogs } = require("../controller/blogController")

const router = express.Router()


// {{{{{{{{{{{blog crud}}}}}}}}}}}

router.get("/allBlog", getAllBlog)

router.post("/createBlog", upload.single('photo'), createBlog)

router.put("/updateBlog", upload.single('photo'), updateBlog)

router.get("/getEditedBlogInfo/:id", getEditedBlogInfo)


router.delete("/deleteBlog/:id", deleteBlog)

router.get("/currentUserBlogs", currentUserBlogs)


// {{{{{{{{{single blog details}}}}}}}}}

router.get("/singleBlog/:id", singleBlog)

// {{{{{{{{{{{{{{{{{{{{get blog by category}}}}}}}}}}}}}}}}}}}}

router.get("/blogByCategory", blogByCategory)


// {{{{{{{{{{{like , unlike blogs}}}}}}}}}}}

router.put("/likeBlog", likeBlog)

router.put("/unlikeBlog", unlikeBlog)


// {{{{{{{{{trending blogs}}}}}}}}}

router.get("/trendingBlog", trendingBlogs)

module.exports = router