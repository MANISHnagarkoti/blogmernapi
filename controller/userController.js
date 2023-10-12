const bcrypt = require("bcryptjs")
const userModel = require("../models/userSchema")
const jwt = require("jsonwebtoken")



exports.registerUser = async (req, res) => {

    try {


        const { name, email, password } = req.body




        const userExisist = await userModel.findOne({ email })



        if (userExisist) {

            res.status(200).send(

                {

                    message: "user already exisits",
                    sucess: false

                }
            )

        } else {



            const hashpassword = await bcrypt.hash(password, 8)


            const user = new userModel({ name, email, password: hashpassword })


            await user.save()

            res.status(201).send({

                message: "user created",
                sucess: true,
                user

            })

        }


    } catch (error) {



        console.log(error)
        res.status(500).send({

            sucess: false,
            message: "error while fetching all users",
            error

        })


    }



}

exports.getAllUsers = async (req, res) => {


    try {


        const alluser = await userModel.find({}).populate("blogs")

        res.status(200).send({
            sucess: true,
            message: "all users ",
            alluser
        })





    } catch (error) {



        console.log(error)
        res.status(500).send({

            sucess: false,
            message: "error while fetching all users",
            error

        })


    }


};

exports.loginUsers = async (req, res) => {


    try {


        const { email, password } = req.body

        console.log(email, password)



        const userIs = await userModel.findOne({ email })

        if (!userIs) {
            return res.status(200).send({

                sucess: false,
                message: "No user found",
            })
        }



        const passwordMatch = await bcrypt.compare(password, userIs.password)


        if (!passwordMatch) {

            return res.status(200).send({

                sucess: false,
                message: "ivalid user name or password",


            })


        }


        const newTokenGenerated = jwt.sign({ user: userIs.id }, "holamurlikatale", {

            expiresIn: 3 * 24 * 60 * 60,


        })


        res.status(200).cookie("jwt", "kkkkk", {

            httpOnly: true,
            SameSite: "None",


        }).send({
            sucess: true,
            message: "Login succesfully",
            user: {
                username: userIs.name,
                userid: userIs.id,
                useremail: userIs.email

            }


        })









    } catch (error) {



        // console.log(error)
        res.status(500).send({

            sucess: false,
            message: "error in login",


        })


    }


};

exports.logoutUsers = async (req, res) => {


    try {



        res.clearCookie('jwt');
        res.status(200).send({

            sucess: true,
            message: "user Log out",


        });





    } catch (error) {



        // console.log(error)
        res.status(500).send({

            sucess: false,
            message: "error in Logout",


        })


    }


};