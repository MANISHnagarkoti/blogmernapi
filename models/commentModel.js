const moongos = require("mongoose")


const commentSchema = new moongos.Schema({


    comment: {

        type: String,
        require: [true, "Category name is required"]

    },
    user: {
        type: moongos.Types.ObjectId,
        ref: "User",
        require: [true, "user id required"]

    },


}, { timestamps: true })


const CommentSchema = moongos.model("Comment", commentSchema)


module.exports = CommentSchema
