const School = require("../models/schoolModel");

// #region Schools

/**
 * Get a list of all schools.
 * @param {*} req The request sent.
 * @param {*} res The response of the request.
 */
exports.list_all_schools = (req, res) => {
  School.find({}, (err, schools) => {
    if (err) {
      res.status(500);
      res.json({
        message: "Server internal error.",
      });
    } else {
      res.status(200);
      res.json(schools);
      console.log("Schools successfully retrieved");
    }
  });
}

/**
 * Post a new school to the DataBase.
 * @param {*} req The request sent, where req.body will contains all data we'll need to do the post. 
 * @param {*} res The response of the request.
 */
exports.create_a_school = (req, res) => {
  const new_school = new School({...req.body});

  new_school.save((err, school) => {
    if (err) {
      res.status(500);
      res.json({
        message: "Server internal error.",
      });
    } else {
      res.status(201);
      res.json(school);
      console.log("School successfully created");
    }
  });
} 
// #endregion


// #region Schools/SchoolID

/**
 * Get one school by his id.
 * @param {*} req The request sent, where req.params.school_id will contains the id of the school.
 * @param {*} res The response of the request.
 */
exports.get_a_school = (req, res) => {
  const id = req.params.school_id;

  School.findById(id, (err, school) => {
    if (err) {
      res.status(500);
      res.json({
        message: "Server internal error.",
      });
    } else {
      res.status(200);
      res.json(school);
      console.log("School successfully retrieved");
    }
  });
}
// #endregion