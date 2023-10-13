const express = require("express")
const app = express()
const db = require("./db")
const PORT = 4000
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require('cookie-parser');



app.use(express.json())
app.use(cookieParser());



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
  origin: 'https://tekkentagtgc.vercel.app',
  credentials: true,
  exposedHeaders: ["set-cookie"]
}));

app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', "https://tekkentagtgc.vercel.app");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:5173'
// }));







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


  res.cookie("ss", "sss", {

    httpOnly: true,
    SameSite: "None",
    secure: false

  }).send("yodaaa")



})

app.listen(PORT, () => {


  console.log("server running on" + PORT)

})





