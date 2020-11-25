const Group = require("../models/groupModel");
const {capitalize, checkMembersKeys, checkQuestionsKeys} = require('../utils/utils');

// #region Groups

/**
 * Get a list of all groups.
 * @param {*} req The request sent.
 * @param {*} res The response of the request.
 */
exports.list_all_groups = (req, res) => {
  Group.find({}, (err, groups) => {
    if (err) {
      res.status(500);
      res.json({
        message: "Server internal error.",
      });
    } else {
      res.status(200);
      res.json(groups);
      console.log("Groups successfully retrieved");
    }
  });
};

/**
 * Post a new group to the DataBase.
 * @param {*} req The request sent, where req.body will contains all data we'll need to do the post.
 * @param {*} res The response of the request.
 */
exports.create_a_group = async(req, res) => {
  const {members} = req.body;
  const {questions} = req.body;
  const {about} = req.body;

  try {

    /*
      let verifDuplicate = await Group.find({members}).exec(); 
      console.log(verifDuplicate);  // get tout les groupes afin de pouvoir ensuite boucler dessus pour verifier si des mails/phone existe deja
    */

    if (checkMembersKeys(members) && checkQuestionsKeys(questions) && about) {

      
      members.forEach(member => {
        member.lastname = member.lastname.toUpperCase();
        member.firstname = capitalize(member.firstname);
        member.email = member.email.toLowerCase();
      })

      const new_group = new Group({ ...req.body });

      new_group.save((err, group) => {
        if (err) {
          res.status(500);
          res.json({
            message: "Internal error occured"
          });
        } else {
          res.status(201);
          res.json(group);
          console.log("Group successfully created");
        }
      });
    } else {
      res.status(500);
      res.json({
        // message: err.message, log error precis pour debug
        message: "Internal error occured"
      });
    }
  } catch (err) {
    res.json({
      message: "Internal error occured"
    });
    console.log(err);
  }
};
// #endregion