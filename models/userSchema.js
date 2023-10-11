const moongos = require("mongoose")


const userSchema = new moongos.Schema({


    name: {

        type: String,
        require: [true, "user name is required"]

    },

    email: {

        type: String,
        require: [true, "user email is required"]

    },
    password: {

        type: String,
        require: [true, "password required"]

    }, blogs: [

        {
            type: moongos.Types.ObjectId,
            ref: "Blog",
        }

    ]

}, { timestamps: true })


const UserSchema = moongos.model("User", userSchema)


module.exports = UserSchema
