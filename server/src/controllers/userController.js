const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  isValid,
  isValidFullName,
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidObjectId,
} = require("../utils/validator");

//Signup User

const signupUser = async (req, res) => {
  try {
    let userData = req.body;
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Bad Request! No Data Provided" });
    }

    let { fullName, email, password, phone, bio, role } = userData;

    // Full Name Validation
    if (!isValid(fullName)) {
      return res.status(400).json({ msg: "Full Name is Required" });
    }

    if (fullName.length < 2 || !isValidFullName(fullName)) {
      return res.status(400).json({ msg: "Invalid Full Name" });
    }

    // Email Validation
    if (!isValid(email)) {
      return res.status(400).json({ msg: "Email is Required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    let duplicateEmail = await userModel.findOne({ email });

    if (duplicateEmail) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    // Password Validation
    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is Required" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    // Phone Validation
    if (!isValid(phone)) {
      return res.status(400).json({ msg: "Phone Number is Required" });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ msg: "Invalid Phone Number" });
    }

    let duplicatePhoneNo = await userModel.findOne({ phone });
    if (duplicatePhoneNo) {
      return res.status(400).json({ msg: "Phone Number Already Exists" });
    }

    // Bio Validation
    if (bio !== undefined) {
      if (bio.trim().length > 200) {
        return res
          .status(400)
          .json({ msg: "Bio Should not exceed 200 Characters." });
      }
    }

    // Role Validation
    if (role !== undefined) {
      if (role !== "user") {
        return res.status(400).json({ msg: "Invalid Role" });
      }
    }

    // Password Hashing
    let hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;

    let userAdded = await userModel.create(userData);

    return res.status(201).json({ msg: "Signup Successfully Done", userAdded });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    let data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "Bad Request! No Data Provided" });
    }

    const { email, password } = data;

    if (!isValid(email)) {
      return res.status(400).json({ msg: "Email is Required" });
    }

    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is Required" });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    let passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }

    let token = jwt.sign(
      {
        userId: user._id,
        userRole: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    return res.status(200).json({ msg: "Login Successfull", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { signupUser, loginUser };
                 