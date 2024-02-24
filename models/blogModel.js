const moongos = require("mongoose");

const blogSchema = new moongos.Schema(
  {
    title: {
      type: String,
      require: [true, "title name is required"],
    },

    description: {
      type: String,
      require: [true, "description email is required"],
    },
    category: {
      type: moongos.Types.ObjectId,
      ref: "Categories",
      require: [true, "category required"],
    },
    imgUrl: {
      type: String,
      require: [true, "imgurl required"],
    },
    publicId: {
      type: String,
    },
    userid: {
      type: moongos.Types.ObjectId,
      ref: "User",
      require: [true, "user id required"],
    },
    likes: [
      {
        type: moongos.Types.ObjectId,
        ref: "User",
      },
    ],
    likesNum: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: moongos.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const BlogSchema = moongos.model("Blog", blogSchema);

module.exports = BlogSchema;
