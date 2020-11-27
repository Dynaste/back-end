const School = require("../models/schoolModel");
const jwt = require("jsonwebtoken");

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
};

/**
 * Post a new school to the DataBase.
 * @param {*} req The request sent, where req.body will contains all data we'll need to do the post.
 * @param {*} res The response of the request.
 */
exports.create_a_school = async (req, res) => {
  try {
    if (
      req.body.name &&
      req.body.location &&
      req.body.name !== req.body.location
    ) {
      // Equivalent to : SELECT * FROM School WHERE name = req.body.name AND location = req.body.location
      let schoolInDb = await School.find({
        name: req.body.name,
        location: req.body.location,
      }).exec();
      console.log("School in db: ", schoolInDb);

      if (schoolInDb && schoolInDb.length > 0) {
        throw "This school already exists.";
      } else {
        const new_school = new School({ ...req.body });

        new_school.save((err, school) => {
          if (err) {
            throw "Server internal error";
          } else {
            res.status(201);
            res.json(school);
            console.log("School successfully created");
          }
        });
      }
    } else {
      throw "You can't set the same value for name and location, all fields must be complete.";
    }
  } catch (err) {
    res.status(500);
    res.json({
      message: err,
    });
  }
};
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
        message: "Internal server error.",
      });
    } else {
      res.status(200);
      res.json(school);
      console.log("School successfully retrieved");
    }
  });
};
// #endregion

/* exports.update_a_school = (req, res) => {
  let statusCode = 201;
  try {
    const schoolId = req.params.school_id;
    const payload = jwt.decode(req.headers["authorization"]);
    
    if (req.body.location && req.body.name) {

      const chekIfSchoolAlreadyExist = await School.find({
        name: newSchool.name,
        location: newSchool.location
      }).exec();

      if (chekIfSchoolAlreadyExist.length === 0) {

      if (payload.associatedSchoolId === schoolId) {
        console.log("token exist");
        School.findByIdAndUpdate(schoolId, { new: true }, async (err, school) => {
            if (err) {
              throw "Internal server error.";
            } else {
              console.log({ school });
              const newSchool = { ...school, name: req.body.name, location: req.body.location };
              console.log("newSchool : ", newSchool);

              
                res.status(200);
                res.json(newSchool);
               
            }
          }
        );
      }
    }else {
                throw "This school already exists.";
              } else {
        statusCode = 403;
        throw "You are not and administrators.";
      }
    } else {
      statusCode = 403;
      throw "You have to set data for update.";
    }
  } catch (err) {
    res.status(statusCode);
    res.json({
      message: err,
    });
  }
}; */

exports.update_a_school = async (req, res) => {
  let statusCode = 201;
  try {
    const schoolId = req.params.school_id;
    const payload = jwt.decode(req.headers["authorization"]);
    const {location, name} = req.body;
    
    if (location && name) {

      const schoolOccurences = await School.find({
        name: name,
        location: location
      }).exec();
      console.log(schoolOccurences); // Expected si length = 0 pas de correspondance si length > 0 alors doublon;

      if(schoolOccurences.length === 0){
        if (payload.associatedSchoolId === schoolId) {
          console.log("token exist");
          School.findByIdAndUpdate(schoolId, req.body, { new: true }, (err, school) => {
            if (err) {
              statusCode = 500;
              throw "Internal server error.";
            }
            else {
              const newSchool = { _id: school._id, name: name, location: location, __v: school.__v };
              console.log("newSchool : ", newSchool);
              res.status(200);
              res.json(newSchool);  
            }
          });
        } else {
          statusCode = 403;
          throw "You are not and administrators of this school.";
        }
      } else{
        statusCode = 403;
        throw "This school already exists.";
      }
    } else{
      statusCode = 403;
      throw "You have to set data for update.";
    }
  }
  catch(err){
    res.status(statusCode);
    res.json({
      message: err,
    });
  }
} 