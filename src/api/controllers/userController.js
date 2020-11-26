const User = require("../models/userModel");

// #region Users

/**
 * Get a list of all users.
 * @param {*} req The request sent.
 * @param {*} res The response of the request.
 */
exports.list_all_users = (req, res) => {
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
exports.create_an_user = (req, res) => {
  const new_user = new User({...req.body});

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
// #endregion


exports.login_an_user = (req, res) => {
  // Login + verif JWT
}
