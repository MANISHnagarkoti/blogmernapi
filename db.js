const mongoose = require("mongoose");
require("dotenv").config()

const db = async () => {
    try {

console.log(process.env.MONGODB_URL)

        // const res = await mongoose.connect('mongodb://127.0.0.1:27017/usersdb',
        const res = await mongoose.connect( `${process.env.MONGODB_URL}` ,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

        console.log("database successfully connected")
        
    } catch (error) {

        console.log(error)
    }
}



module.exports = db
