const bcrypt = require("bcryptjs");
const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const uploadOnCloudinary = require("../utils/imgUpload")
const updateImageToCloudinary = require("../utils/updateImg")
const sendMail = require("../utils/sendMail")

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExisist = await userModel.findOne({ email });

    if (userExisist) {
      res.status(200).send({
        message: "user already exisits",
        sucess: false,
      });
    } else {
      const hashpassword = await bcrypt.hash(password, 8);



      if (req.file !== undefined) {

        const photo = await uploadOnCloudinary(req.file.path)

        const user = new userModel({
          name,
          email,
          password: hashpassword,
          profileImg: photo.secure_url,
          publicId: photo.public_id,
        });

        await user.save();

        const token = jwt.sign({ userId: user.id }, "holamurlikatale", { expiresIn: "1h" });

        const url = `${process.env.FRONT_URL}verifyRegisterUser/${user.id}/verify/${token}`;

        await sendMail(user.email, url, "Email Verification Link")

        return res.status(201).send({
          message: "user created and please verify email",
          sucess: true,
          user,
        });

      }

      const user = new userModel({
        name,
        email,
        password: hashpassword,
      });

      await user.save();

      const token = jwt.sign({ userId: user.id }, "holamurlikatale", { expiresIn: "1h" });

      const url = `${process.env.FRONT_URL}/verifyRegisterUser/${user.id}/verify/${token.token}`;

      await sendMail(user.email, url, "Email Verification Link")

      return res.status(201).send({
        message: "user created and please verify email",
        sucess: true,
        user,
      });


    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while fetching all users",
      error,
    });
  }
};


exports.verifyRegisterUser = async (req, res) => {

  try {


    const user = await userModel.findOne({ _id: req.params.id });

    if (user.verify) {

      return res.status(200).send({ sucess: true, message: "Already Verified" });

    }

    if (!user) return res.status(200).send({ sucess: false, message: "Invalid link" });

    const token = jwt.verify(req.params.token, "holamurlikatale")

    if (!token) return res.status(200).send({ sucess: false, message: "Invalid link" });

    if (token.userId === user._id) return res.status(200).send({ sucess: false, message: "Invalid link" });

    await userModel.findByIdAndUpdate(user._id, { $set: { verify: true } });

    return res.status(200).send({ sucess: true, message: "Email verified successfully", email: user.email });

  } catch (error) {
    res.status(500).send({ sucess: false, message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const alluser = await userModel.find({}).populate("blogs");

    res.status(200).send({
      sucess: true,
      message: "all users ",
      alluser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error while fetching all users",
      error,
    });
  }
};


exports.loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userIs = await userModel.findOne({ email });

    if (!userIs) {
      return res.status(200).send({
        sucess: false,
        message: "No user found",
      });
    }

    if (!userIs.verify) {
      return res.status(200).send({
        sucess: false,
        message: "please verify account first then login",
      });
    }


    const passwordMatch = await bcrypt.compare(password, userIs.password);

    if (!passwordMatch) {
      return res.status(200).send({
        sucess: false,
        message: "ivalid user name or password",
      });
    }

    const newTokenGenerated = jwt.sign({ user: userIs.id }, "holamurlikatale");

    res
      .status(200)
      .cookie("jwt", newTokenGenerated, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,

      })
      .send({
        sucess: true,
        message: "Login succesfully",
        user: {
          username: userIs.name,
          userid: userIs.id,
          useremail: userIs.email,
          profilepic: userIs.profileImg
        },
      });
  } catch (error) {
    // console.log(error)
    res.status(500).send({
      sucess: false,
      message: "error in login",
    });
  }
};


exports.changeProfilePic = async (req, res) => {
  try {

    const { userid: id } = req.body;

    const user = await userModel.findById(id)

    if (user.publicId === "") {

      const photo = await uploadOnCloudinary(req.file.path, "profile")

      const updatedProfilePic = await userModel.findByIdAndUpdate(id, {
        $set: {
          profileImg: photo.secure_url,
          publicId: photo.public_id,
        }

      }, { new: true }).select('profileImg')

      return res.status(201).send({
        sucess: true,
        message: "update sucessfully",
        updatedProfilePic,
      });

    }

    const photo = await updateImageToCloudinary(req.file.path, user.publicId, "profile")

    const updatedProfilePic = await userModel.findByIdAndUpdate(id, {
      $set: {
        profileImg: photo.secure_url,
        publicId: photo.public_id,
      }

    }, { new: true }).select('profileImg')

    res.status(201).send({
      sucess: true,
      message: "update sucessfully",
      updatedProfilePic,
    });



  } catch (error) {
    // console.log(error)
    res.status(500).send({
      sucess: false,
      message: "error in update profile pic",
    });
  }
};





exports.updateUserName = async (req, res) => {
  try {

    const { userid: id, name } = req.body;

    const newName = await userModel.findByIdAndUpdate(id, {
      $set: {
        name: name,
      }

    }, { new: true }).select('name')

    return res.status(201).send({
      sucess: true,
      message: "update sucessfully",
      newName,
    });



  } catch (error) {
    // console.log(error)
    res.status(500).send({
      sucess: false,
      message: "error in update profile name",
    });
  }
};


exports.updateUserPassword = async (req, res) => {
  try {

    const { prevPassword, newPassword, userid: id } = req.body;

    const userIs = await userModel.findById(id)

    const passwordMatch = await bcrypt.compare(prevPassword, userIs.password);

    if (!passwordMatch) {
      return res.status(200).send({
        sucess: false,
        message: "wrong credentials",
      });
    }

    const hashpassword = await bcrypt.hash(newPassword, 8);

    await userModel.findByIdAndUpdate(id, {
      $set: {
        password: hashpassword,
      }

    }, { new: true })

    return res.status(201).send({
      sucess: true,
      message: "update sucessfully",
    });



  } catch (error) {
    // console.log(error)
    res.status(500).send({
      sucess: false,
      message: "error in while updating password",
    });
  }
};





exports.logoutUsers = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).send({
      sucess: true,
      message: "user Log out",
    });
  } catch (error) {
    // console.log(error)
    res.status(500).send({
      sucess: false,
      message: "error in Logout",
    });
  }
};

exports.forgetPassword = async (req, res) => {

  const { email } = req.body

  try {


    const userIs = await userModel.findOne({ email })

    if (!userIs) {
      return res.status(200).send({
        sucess: false,
        message: "No user found",
      });
    }

    const tokenLink = jwt.sign({ userId: userIs._id }, `holamurlikatale${userIs.password}`, { expiresIn: "1d" });

    const url = `${process.env.FRONT_URL}resetPassword/${userIs._id}/${tokenLink}`;

    await sendMail(userIs.email, url, "Reset Password Link")

    res.status(200).send({
      sucess: true,
      message: "Check email for link",
    });
  } catch (error) {
    // console.log(error)
    res.status(500).send({
      sucess: false,
      message: "error",
    });
  }
};


exports.resetPassword = async (req, res) => {


  const { token, userid } = req.params
  const { newPassword } = req.body


  try {

    const passwordIs = await userModel.findById(userid)

    jwt.verify(token, `holamurlikatale${passwordIs.password}`, async (error, decode) => {
      if (error) {
        return res.status(200).send({
          sucess: false,
          message: "not verify",
        });
      } else {

        const hashpassword = await bcrypt.hash(newPassword, 8);

        await userModel.findByIdAndUpdate(userid, {
          $set: {

            password: hashpassword

          }
        })

        // if (userPasswordUpdate) {
        //   return res.status(200).send({
        //     sucess: true,
        //     message: "user password update",
        //   });
        // }

      }
    });


    return res.status(200).send({
      sucess: true,
      message: "password update",
    });





  } catch (error) {
    // console.log(error)
    res.status(500).send({
      sucess: false,
      message: "error in Logout",
    });
  }
};