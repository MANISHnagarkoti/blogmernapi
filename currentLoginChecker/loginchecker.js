// const app = require("express")()
const jwt = require("jsonwebtoken")
const userModel = require("../models/userSchema")


const loginAuth = (req, res) => {


    const token = req.cookies.jwt


    const checkkar = req.cookies

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
            message: checkkar

        })

    }





}



module.exports = loginAuth 