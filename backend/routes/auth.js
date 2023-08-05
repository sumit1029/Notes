const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();

const JWT_SECRET = "Sumit@2002";

//ROUTE 1: create a user using POST "/api/auth/" Doesn't require auth
router.post(
  "/createuser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let succsess = false;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // cheak if a user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({succsess, error: "Sorry a user with this email already exist" });
      }
      //creating secured password
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      // creating a user
      user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      succsess = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({succsess, authToken });
      // .then(user => res.json(user))
      // .catch(err => {console.log(err)
      // res.json({error: "Please enter a unique value for email", message: err.message})})
      // res.json(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let succsess = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({succsess, errors: errors.array() });
    }

    const { email, password } = req.body;
    
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ succsess, error: "please try to login with correct credentials" });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).json({succsess, error: "Invalid Credentials" });
        } else {
          const data = {
            user: {
              id: user.id,
            },
          };
          succsess = true;
          const authToken = jwt.sign(data, JWT_SECRET);
          res.json({succsess, authToken });
        }
      });
    } catch (error) {
      throw new Error("Error while finding the user");
    }
  }
);

// ROUTE 3: getting the details of a user using: POST "/api/auth/getuser". login required
router.post(
  "/getuser", fetchuser,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      userID = req.user.id;
      const user = await User.findById(userID).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
