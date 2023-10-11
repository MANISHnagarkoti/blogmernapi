const express = require("express")
const app = express()
const db = require("./db")
const PORT = 4000
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require('cookie-parser');

require("dotenv").config()




// {{{{{{{{{{router}}}}}}}}}}
const userRoutes = require("./routes/userRoutes")
const blogsRoutes = require("./routes/blogRoutes")
const categorieRoutes = require("./routes/categoryRoutes")
const commentRoutes = require("./routes/commentRoutes")





// { { { { { { { {data base } } } } } } } }
db()



// {{{{{{{{{{middel ware}}}}}}}}}}

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
  
}));


app.use(express.json())
app.use(cookieParser());


// app.use(morgan("dev"))

// {{{{{{{{{{{users routes}}}}}}}}}}}
app.use("/user", userRoutes)


// {{{{{{{{{{{users routes}}}}}}}}}}}
app.use("/blogs", blogsRoutes)


// {{{{{{{{{{{categories}}}}}}}}}}}
app.use("/categorie", categorieRoutes)


// {{{{{{{{{{{comments}}}}}}}}}}}
app.use("/comment", commentRoutes)


// {{{{{{{{{{{{{}}}}}}}}}}}}}

app.get("/", (req, res) => {


  res.send("Heloo ther]]e")



})

app.listen(PORT, () => {


  console.log("server running on" + PORT)

})





