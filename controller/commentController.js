// {{{{{{{{{{{{{{{{category get}}}}}}}}}}}}}}}}
const blogModel = require("../models/blogModel");
const commentModel = require("../models/commentModel");

exports.postComment = async (req, res) => {
  const { comment, userid, blogid } = req.body;

  try {
    const postcomment = new commentModel({ comment, user: userid });

    await postcomment.save();

    const blog = await blogModel.findById(blogid);

    blog.comments.push(postcomment);

    blog.save();

    if (!blog) {
      return res.status(404).send({
        sucess: true,
        message: "no blog found",
      });
    }

    res.status(200).send({
      sucess: true,
      message: "post succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while post comment",
      error,
    });
  }
};

exports.getComment = async (req, res) => {
  const { blogid } = req.params;

  try {
    const comments = await blogModel.findById(blogid, "comments").populate({
      path: "comments",
      options: {
        sort: { _id: -1 },
      },
      populate: {
        path: "user",
        select: "name profileImg",

      },
    });


    if (!comments) {
      return res.status(404).send({
        sucess: true,
        message: "no blog found",
        results: [],
      });
    }

    res.status(200).send({
      sucess: true,
      message: "get succesfully",
      results: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while get comment",
      error,
    });
  }
};

exports.deleteComment = async (req, res) => {
  const { commentid, blogid } = req.params;

  try {

    const deletedComment = await commentModel.findByIdAndDelete(commentid)

    const blog = await blogModel.findById(blogid);

    blog.comments.pull(deletedComment);

    blog.save();

    if (!blog) {
      return res.status(404).send({
        sucess: true,
        message: "no blog found",
      });
    }

    res.status(200).send({
      sucess: true,
      message: "deleted succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while deleting comment",
      error,
    });
  }
};