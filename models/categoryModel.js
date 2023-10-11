const moongos = require("mongoose")


const categorySchema = new moongos.Schema({


    category: {

        type: String,
        require: [true, "Category name is required"]

    },


}, { timestamps: true })


const CategorySchema = moongos.model("Categories", categorySchema)


module.exports = CategorySchema
