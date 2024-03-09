const blogModel = require("../models/blogModel");
const userModel = require("../models/userSchema");
const uploadOnCloudinary = require("../utils/imgUpload")
const updateImageToCloudinary = require("../utils/updateImg")
const deleteImg = require("../utils/deleteImg")
// {{{{{{blog crud controllers}}}}}}

exports.getAllBlog = async (req, res) => {
  try {
    const allblog = await blogModel
      .find({}, "-description -publicId")
      .populate("userid", "name")
      .populate("category");

    if (!allblog) {
      return res.status(200).send({
        sucess: false,
        message: "No blog found",
      });
    }

    res.status(200).send({
      sucess: true,
      message: "all blogs",
      allblog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while fetching all blogs",
      error,
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, description, userid, category } = req.body;

    const photo = await uploadOnCloudinary(req.file.path, "blogpic")

    const newblog = new blogModel({
      title,
      description,
      imgUrl: photo.secure_url,
      publicId: photo.public_id,
      userid,
      category,
    });

    await newblog.save();

    const userexit = await userModel.findById(userid);

    userexit.blogs.push(newblog);

    await userexit.save();

    res.status(201).send({
      sucess: true,
      message: "create sucessfully",
      newblog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while creating blog",
      error,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, description, id, category } = req.body;

    const editBlogByImg = await blogModel.findById(id)



    if (req.file) {

      const photo = await updateImageToCloudinary(req.file.path, editBlogByImg.publicId, "blogpic")

      const updatedblog = await blogModel.findByIdAndUpdate(
        id,
        {
          title, description, category, imgUrl: photo.secure_url,
          publicId: photo.public_id
        },
        { new: true }
      );

      return res.status(201).send({
        sucess: true,
        message: "update sucessfully",
        updatedblog,
      });

    }

    const updatedblog = await blogModel.findByIdAndUpdate(
      id,
      {
        title, description, category,
      },
      { new: true }
    );

    res.status(201).send({
      sucess: true,
      message: "update sucessfully",
      updatedblog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while updating blog",
      error,
    });
  }
};

exports.getEditedBlogInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const EditedBlogInfo = await blogModel.findById(
      id,
      "title description imgUrl category"
    );

    if (!EditedBlogInfo) {
      res.status(404).send({
        sucess: true,
        message: "post not found",
        findsingleblog,
      });
    }

    res.status(201).send({
      sucess: true,
      message: "get single post sucessfully",
      getblog: EditedBlogInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while get single post blog",
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findByIdAndDelete(id).populate("userid");

    deleteImg(blog.publicId)

    await blog.userid.blogs.pull(blog);
    await blog.userid.save();

    res.status(201).send({
      sucess: true,
      message: "delete sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while delete blog",
      error,
    });
  }
};

// {{{{{{{{{{get single blog controller}}}}}}}}}}

exports.singleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const findsingleblog = await blogModel
      .findById(id)
      .populate("userid", "name profileImg")
      .populate("category");

    if (!findsingleblog) {
      res.status(404).send({
        sucess: true,
        message: "post not found",
        findsingleblog,
      });
    }

    res.status(201).send({
      sucess: true,
      message: "get single post sucessfully",
      singleBlog: findsingleblog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while get single post blog",
      error,
    });
  }
};

// {{{{{{{{{{{{{get login user blogs}}}}}}}}}}}}}

exports.currentUserBlogs = async (req, res) => {
  try {
    const { userid } = req.query;

    const limit = parseInt(req.query.limit) || 4;

    const page = parseInt(req.query.page) || 1;

    const skip = page * limit - limit;

    const sortby = req.query.sortby

    let sort = { title: -1 }

    const search = req.query.search;

    switch (sortby) {
      case "ascending":
        sort = { title: 1 }
        break;
      case "descending":
        sort = { title: -1 }
        break;
      case "popular":
        sort = { likesNum: -1 }
        break;
      case "newest":
        sort = { _id: -1 }
        break;


      default:
        text = { title: -1 };
    }



    const findLoginuserblog = await userModel
      .findById(userid, "blogs")
      .populate({
        path: "blogs",
        match: { title: new RegExp('^' + search, 'i') },
        select: "-userid",
        options: {
          skip: skip,
          limit: limit,
          sort: sort,
        },
      });


    const totalblog = await userModel
      .findById(userid)
      .select("blogs")
      .populate({
        path: "blogs",
        select: "-userid",
        match: { title: new RegExp('^' + search, 'i') },
      });


    if (!findLoginuserblog) {
      return res.status(200).send({
        sucess: true,
        message: "post not found",
        allblogs: [],
      });
    }

    res.status(200).send({
      sucess: true,
      message: "get blogs sucessfully",
      allblogs: findLoginuserblog,
      totalblog: totalblog.blogs.length,
      limit,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while get  blogs",
      error,
    });
  }
};

// {{{{{{{{{{{{{{{{{{{{{{{{{{{{get blog by category}}}}}}}}}}}}}}}}}}}}}}}}}}}}

exports.blogByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const limit = parseInt(req.query.limit) || 6;

    const page = parseInt(req.query.page) || 1;

    const search = req.query.search;

    const skip = page * limit - limit;

    const allblogs = await blogModel
      .aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userid",
            foreignField: "_id",
            as: "userid",
          },
        },

        {
          $match: {
            "category.category": {
              $regex: new RegExp(category === "All" ? "" : category, "i"),
            },
          },
        },

        {
          $match: {
            title: { $regex: new RegExp(search || "", "i") },
          },
        },

        {
          $unwind: {
            path: "$category",
          },
        },
        {
          $unwind: {
            path: "$userid",
          },
        },
      ])
      .sort({ likesNum: -1 })
      .skip(skip)
      .limit(limit);

    const totalblogs = await blogModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $match: {
          "category.category": {
            $regex: new RegExp(category === "All" ? "" : category, "i"),
          },
        },
      },

      {
        $match: {
          title: { $regex: new RegExp(search || "", "i") },
        },
      },

      { $count: "Total" },
    ]);

    if (!allblogs) {
      return res.status(200).send({
        sucess: true,
        message: "post not found",
        allblogs: [],
      });
    }

    res.status(200).send({
      sucess: true,
      message: "get blogs sucessfully",
      allblogs: allblogs,
      totalblogs: totalblogs.length === 0 ? [] : totalblogs[0].Total,
      limit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while get  blogs",
      error,
    });
  }
};

// {{{{{{{{{{{{{{{{{{{{{{{{{{{{like blog}}}}}}}}}}}}}}}}}}}}}}}}}}}}

exports.likeBlog = async (req, res) => {
  try {
    const { userid, blogid } = req.body;

    const updatedBlog = await blogModel.findByIdAndUpdate(blogid, {

      $push: { likes: userid },
      $inc: { likesNum: 1 }
    }, {
      new: true
    })
    res.status(200).send({
      sucess: true,
      likes: updatedBlog.likesNum,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while like  blog",
      error,
    });
  }
};

// {{{{{{{{{{{{{{{{{{{{{{{{{dislike blog}}}}}}}}}}}}}}}}}}}}}}}}}

exports.unlikeBlog = async (req, res) => {
  try {
    const { userid, blogid } = req.body;

    const updatedBlog = await blogModel.findByIdAndUpdate(blogid, {

      $pull: { likes: userid },
      $inc: { likesNum: -1 }
    }, {
      new: true
    })
    res.status(200).send({
      sucess: true,
      likes: updatedBlog.likesNum,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while unlike blog",
      error,
    });
  }
};


// {{{{{{{{{{{{trending blogs}}}}}}}}}}}}


exports.trendingBlogs = async (req, res) => {
  try {

    const trending = await blogModel.find({}).sort({ likesNum: -1 }).limit(3)

    res.status(200).send({
      sucess: true,
      trending
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      sucess: false,
      message: "error while fetching",
      error,
    });
  }
};









