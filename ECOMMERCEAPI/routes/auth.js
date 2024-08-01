const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    // Check if username or email already exists
    console.log("helo")
    const existingUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }]
    });
   console.log("sdf",existingUser)
    if (existingUser) {
      if (existingUser.username === req.body.username) {
        return res.status(400).json({
          success: false,
          message: "Username is already taken",
        });
      } else if (existingUser.email === req.body.email) {
        return res.status(400).json({
          success: false,
          message: "Email address is already registered",
        });
      }
    }

    // Create new user
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });

    console.log(newUser);

    // Save the new user
    console.log("before");
    const savedUser = await newUser.save();
    console.log("after");
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: err,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password) {
      return res.status(400).json("Username and password are required.");
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json("Wrong credentials!");
    }

    // Decrypt password and compare
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      return res.status(401).json("Wrong credentials!");
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    // Omit password from response
    const { password: _, ...others } = user._doc;

    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.error(err); // Log error details for debugging
    return res.status(500).json("Internal server error. Please try again later.");
  }
});

module.exports = router;

