const bcrypt = require("bcryptjs");
const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const uploadOnCloudinary = require("../utils/imgUpload")
const updateImageToCloudinary = require("../utils/updateImg")

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


        return res.status(201).send({
          message: "user created",
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


      return res.status(201).send({
        message: "user created",
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

    console.log(id, req.file)

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

    console.log(id, name)

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

    console.log(prevPassword, newPassword)

    const userIs = await userModel.findById(id)

    const passwordMatch = bcrypt.compare(prevPassword, userIs.password);

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
