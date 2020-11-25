const School = require("../models/schoolModel");

//#region "/schools"
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
};

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
};
//#endregion

//#region "/schools/:school_id"

/* exports.get_a_school = (req, res) => {

} */

//#region