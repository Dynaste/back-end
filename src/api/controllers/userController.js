require('dotenv').config();
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const validator = require("validator");
const bcrypt = require('bcrypt');
const { capitalize } = require('../utils/utils');

const JWT_TOKEN = process.env.JWT_TOKEN;

// #region Users

/**
 * Get a list of all users.
 * @param {*} req The request sent.
 * @param {*} res The response of the request.
 */
exports.list_all_users = async (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500);
      res.json({
        message: "Server internal error.",
      });
    } else {
      res.status(200);
      res.json(users);
      console.log("Users successfully retrieved");
    }
  });
}

/**
 * Post a new user as an admin to the DataBase.
 * @param {*} req The request sent, where req.body will contains all data we'll need to do the post. 
 * @param {*} res The response of the request.
 */
exports.create_an_user = async(req, res) => {

  /**
   * Check if the email property contains a valid value and if it's greatly formatted, using validator module
   */
  if (!validator.isEmail(req.body.email)) {
    res.status(400);
    res.json({
        message: "Your email don't have a good format"
    })
  } else {
    /**
     *  Encrypt the password using bcrypt module
     * */
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userObj = {
      email : req.body.email,
      password: hashedPassword,
      name : capitalize(req.body.name),
      associatedSchoolId: req.params.school_id 
    };
    const new_user = new User(userObj);

    new_user.save((err, user) => {
      if (err) {
        res.status(500);
        res.json({
          message: "Server internal error.",
        });
      } else {
        res.status(201);
        res.json(user);
        console.log("User successfully created");
      }
    });
  }  
} 
// #endregion

exports.login_an_user = (req, res) => {

  User.findOne({email: req.body.email},(error, user) => {
    
    if (error) {
      res.status(403);
      console.log(error);
      res.json({
        message: "Wrong Email or/and password",
      });
    }
    else {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).send({ message: "Wrong Email or/and password" });
      }
      /* if(decryptPassword(req.body.password, user.password)) */
      jwt.sign({ email: user.email, associatedSchoolId: user.associatedSchoolId, role: "user" }, JWT_TOKEN, { expiresIn: "30 days" }, (error, token) => {
        if (error) {
          res.status(400);
          console.log(error);
          res.json({
            message: "Wrong Email or/and password"
          });
        }
        else {
          res.json({
            token
          });
        }
      })
    }
  })
}
