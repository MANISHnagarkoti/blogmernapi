// const app = require("express")()
const jwt = require("jsonwebtoken")
const userModel = require("../models/userSchema")


const loginAuth = (req, res) => {


    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjUyNWU1MDY3MTMxZmUyMDNlOTBjY2ZkIiwiaWF0IjoxNjk2OTgyMjg3LCJleHAiOjE2OTcyNDE0ODd9.k-QQpS6X0QozESpoRnsIywoCOtyev8WpUVObphWyr_o"




    if (token) {


        jwt.verify(token, "holamurlikatale", async (error, decode) => {

            if (error) {

                return res.json("token wrong")




            } else {



                const currentUserLogin = await userModel.findById(decode.user)


                if (!currentUserLogin) {


                    return res.send(

                        {
                            sucess: false,
                            message: "no user found"
                          
    
                        }
    
                    )
    

                }




                res.send(

                    {
                        sucess: true,
                        user: {
                            username: currentUserLogin.name,
                            userid: currentUserLogin.id,
                            useremail: currentUserLogin.email

                        }


                    }

                )








            }


        })



    } else {


        return res.json({

            sucess: false,
            message: "no token found fucekr"

        })

    }





}



module.exports = loginAuth 