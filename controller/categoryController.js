// {{{{{{{{{{{{{{{{category get}}}}}}}}}}}}}}}}
const categoryModel = require("../models/categoryModel");

exports.getallcat = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    if (!categories) {
      return res.status(200).send({
        sucess: true,
        message: "categories not found",
        categories: [],
      });
    }

    res.status(200).send({
      sucess: true,
      message: "get blogs sucessfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while get   categories",
      error,
    });
  }
};
